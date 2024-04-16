interface Config {
    provider: string;
    model: string;
    API_KEY: string;
  }
  
  interface QuestionsDetails{
    data: any
  }
  export async function llm_inference(questionsDetails: string) {
    const config: Config = {
      provider: 'together', // Update this as per your config
      model: 'mixtral', // Update this as per your config
      API_KEY: '99cdbf744f23cb9dcf770f0426e48806ea133f878d283af3608701ccbb72a6d3',
    };
  
    const endpoint = 'https://api.together.xyz/inference';
    
    const requestBody = {
      model: 'MISTRALAI/MIXTRAL-8X7B-INSTRUCT-V0.1', // Update this with your specific model
      prompt: `[INST] ${questionsDetails} [/INST]`,
      max_tokens: 2000,
      temperature: 0.3,
    };
  
    //try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const content = await response.json();
        console.log(content);
        const output = JSON.parse(content.output.choices[0].text);
        return output;
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    //}catch (error) {
      //console.error(error);
      //throw new Error(`Error: ${error}`);
    //}
  }
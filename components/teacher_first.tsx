import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function teacher_first() {
  return (
    <div
      key="1"
      className="flex flex-cols items-center justify-center min-h-screen py-6"
    >
      <div className="container flex flex-col items-center  justify-center px-4 space-y-2 md:px-6">
        <div className="text-4xl font-bold tracking-tighter">Examate</div>
        <div className=" justify-center max-w-sm items-center flex gap-1">
          <Label htmlFor="pdf">Upload PDF</Label>
          <Input id="pdf" type="file" className="w-full" />
        </div>
        <h2 className="text-lg font-semibold mt-4">Choose Questions</h2>
        <div className="flex flex-col mt-2 space-y-2 w-full max-w-md">
          <div className="flex items-center space-x-4 w-full">
            <input
              id="threeMark"
              name="questionType"
              type="radio"
              value="3 mark"
            />
            <Label htmlFor="threeMark">3 mark questions</Label>
            <select className="select w-full" id="threeMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input
              id="fourMark"
              name="questionType"
              type="radio"
              value="4 mark"
            />
            <Label htmlFor="fourMark">4 mark questions</Label>
            <select className="select w-full" id="fourMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input
              id="sevenMark"
              name="questionType"
              type="radio"
              value="7 mark"
            />
            <Label htmlFor="sevenMark">7 mark questions</Label>
            <select className="select w-full" id="sevenMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input
              id="tenMark"
              name="questionType"
              type="radio"
              value="10 mark"
            />
            <Label htmlFor="tenMark">10 mark questions</Label>
            <select className="select w-full" id="tenMarkCount" name="count">
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <input
              id="fourteenMark"
              name="questionType"
              type="radio"
              value="14 mark"
            />
            <Label htmlFor="fourteenMark">14 mark questions</Label>
            <select
              className="select w-full"
              id="fourteenMarkCount"
              name="count"
            >
              <option value="">Count</option>
              {[...Array(20)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Generate
          </button>
          <div
            key="1"
            className="flex flex-cols items-center justify-center  "
          >
            <div className="container flex flex-col items-center px-4 sp md:px-6">
              <div className="flex flex-col mt-1 space-y-2 w-full max-w-md">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 w-full"
                  >
                    <Label htmlFor={`question${index + 1}`}>{`Question ${
                      index + 1
                    }`}</Label>
                    <textarea
                      id={`question${index + 1}`}
                      className="w-full h-20 p-2 border rounded"
                      placeholder={`Question ${index + 1} will appear here`}
                    ></textarea>
                    <input id={`selectQuestion${index + 1}`} type="checkbox" />
                    <Label htmlFor={`selectQuestion${index + 1}`}>Select</Label>
                  </div>
                ))}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

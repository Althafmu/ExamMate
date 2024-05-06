'use client';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation'

export default function SignupLink() {
  const [userType, setUserType] = useState<string>(''); // State to store user type
  const [name, setName] = useState<string>(''); // State to store name
  const [branch, setBranch] = useState<string>(''); // State to store branch
  const [college, setCollege] = useState<string>(''); // State to store college
  const [institutionId, setInstitutionId] = useState<string>(''); // State to store institution ID
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await supabase.auth.getSession();
    console.log(user)
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: name,
          role: userType,
          institution: college,
          institution_id: institutionId,
          id: user.data.session?.user.id,
          email: user.data.session?.user.email,
        },
      ])
      .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        router.push('/auth');
      }
  };

  return (
    <div key="1" className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Update your profile information.
          </p>
        </div>
        <div>
          <Label className="font-semibold">User Type</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <input
                id="student"
                name="userType"
                type="radio"
                value="student"
                onChange={() => setUserType('student')}
                checked={userType === 'student'}
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                id="teacher"
                name="userType"
                type="radio"
                value="teacher"
                onChange={() => setUserType('teacher')}
                checked={userType === 'teacher'}
              />
              <Label htmlFor="teacher">Teacher</Label>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Input
            id="branch"
            placeholder="Enter your branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="college">Institute</Label>
          <Input
            id="college"
            placeholder="Enter your college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution-id">Institution ID</Label>
          <Input
            id="institution-id"
            placeholder="Enter your institution ID"
            value={institutionId}
            onChange={(e) => setInstitutionId(e.target.value)}
          />
        </div>
        <Button className="w-full" type="submit">
          Update Profile
        </Button>
      </form>
    </div>
  );
}

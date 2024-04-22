'use client'

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const userid = localStorage.getItem('userid');
          if (!userid) {
            router.push('/');
          }
        }
      }, [router]);

  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]=useState('');

    const handleUsernameChange = (event) => {
        const newValue = event.target.value;
        setUsername(newValue);
    };


    const handleEmailChange = (event) => {
        const newValue = event.target.value;
        setEmail(newValue);
    };

    const handlePasswordChange = (event) => {
        const newValue = event.target.value;
        setPassword(newValue);
    };



    const handleSignUp = async () => {
        setError('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Please try again.');
                console.log(response, error);
                console.log("did not work")
            } else {
                console.log("Sucessfull");
                localStorage.setItem('userId', response.userid);
                router.push("/chat")
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
      <div  >
          <h2 style={{ display: "flex", justifyContent: "center",alignItems:"center", marginTop: "160px" , marginBottom:"10px"}}>SignUp page</h2>
          <div style={{ display: "grid", justifyContent: "center", alignContent: "flex-start" }} >
          <Input style={{width: "400px", marginBottom:"10px", marginTop:"20px"}} onChange={handleUsernameChange} placeholder="Enter your name" />
          <Input style={{width: "400px", marginBottom:"10px", marginTop:"20px"}} onChange={handleEmailChange} placeholder="Enter your email"/>
          <Input style={{width: "400px", marginBottom:"10px", marginTop:"20px"}} onChange={handlePasswordChange} placeholder="Enter your password"/>
          <Button style={{marginTop:"20px"}} onClick={handleSignUp}>Button</Button>
          {/* <Button style={{marginTop:"20px"}} onClick={handleSignUp}>Continue with google</Button> */}
          <div style={{ marginTop: "10px", textAlign: "center" }}>
                    Already have an account?{' '}
                    <Link href="/login">
                        Login here
                    </Link>
                </div>
          <h2 style={{ display: "flex", justifyContent: "center",alignItems:"center", marginTop: "160px" , marginBottom:"10px"}}>{error}</h2>
          </div>
      </div>
  );
}

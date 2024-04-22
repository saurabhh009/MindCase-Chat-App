"use client"
import { useState} from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]=useState("");

    const handleEmailChange = (event) => {
        const newValue = event.target.value;
        setEmail(newValue);
        console.log(email)
    };

    const handlePasswordChange = (event) => {
        const newValue = event.target.value;
        setPassword(newValue);
    };

    const handleSignIn = async () => {
        setError('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Invalid email or password. Please try again.');
            } else {
                console.log("ok");
                localStorage.setItem('userId', response.userid);
                router.push('/chat');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{ height: "280px", width: "600px", margin: "auto", display: "grid", justifyContent: "center", alignContent: "flex-start" , marginTop:"180px"}} >
            <h2 style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>Login page</h2>
            <div style={{ display: "grid", justifyContent: "center", alignContent: "flex-start" }} >

            <Input style={{width: "400px", marginBottom:"20px", marginTop:"40px"}} onChange={handleEmailChange} placeholder="Enter your email"/>
            <Input style={{width: "400px", marginTop:"20px", marginBottom:"20px"}} onChange={handlePasswordChange} placeholder="Enter your password"/>
            <Button style={{marginTop:"20px"}} onClick={handleSignIn}>Button</Button>

            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
    );
}

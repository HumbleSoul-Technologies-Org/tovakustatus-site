import { useState } from "react";
import { useLocation } from "wouter";
import { login } from "@/lib/localStorage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader, Lock } from "lucide-react";
import axios from "axios";
import { set } from "date-fns";
import { navigate } from "wouter/use-browser-location";

export default function Login() {
  const [setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login/`,
        {
          username,
          password,
        },
        { timeout: 10000 }
      );

      if (res.status === 200 && res.data.token) {
        login(res.data.token);
        toast({
          title: "Login Successful",
          description: "Welcome to the dashboard!",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center">
              <Lock className="h-8 w-8 text-accent-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Dashboard Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the Tova ku Status dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? (
                <span className="flex gap-2">
                  Processing...
                  <Loader className="animate-spin size-9" />
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo Credentials:</strong>
              <br />
              Username: admin
              <br />
              Password: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

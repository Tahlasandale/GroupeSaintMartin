"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons";

export function AuthForm() {
  const [formType, setFormType] = useState<"login" | "signup">("login");

  const toggleFormType = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
  };

  const isLogin = formType === "login";

  return (
    <Card className="w-full max-w-sm animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-in-out">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Sign in to access your account."
            : "Enter your details to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" required className="pl-10" />
            </div>
          </div>
          {!isLogin && (
            <div className="grid gap-2 animate-in fade-in-0 duration-500">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  className="pl-10"
                />
              </div>
            </div>
          )}
          <Button type="submit" className="w-full mt-2">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          <GoogleIcon className="mr-2 h-4 w-4" />
          {isLogin ? "Sign in with Google" : "Sign up with Google"}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="link"
            onClick={toggleFormType}
            className="font-semibold p-1 text-primary"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}

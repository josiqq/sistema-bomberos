"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GalleryVerticalEnd } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
        setIsLoading(false);
      } else if (result?.ok) {
        router.replace("/"); // Redirigir al dashboard en caso de éxito
      }
    } catch (err) {
      setError("Ocurrió un error inesperado. Por favor, inténtalo más tarde.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="p-3 bg-main rounded-md">
            <GalleryVerticalEnd className="h-8 w-8 text-main-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Bienvenido</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre@cuartel.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-sm font-medium text-red-600">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col text-xs text-center">
        <p className="text-gray-500">
          © 2024 Sistema de Gestión de Bomberos.
        </p>
         <p className="text-gray-400 mt-2">
            Usuario: `jose.garcia@cuartel.com` | Pass: `password123`
        </p>
      </CardFooter>
    </Card>
  );
}
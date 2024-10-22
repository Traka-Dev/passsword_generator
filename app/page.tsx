"use client";

import { useState, useEffect, SetStateAction, useCallback } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Slider } from "@/app/components/ui/slider";
import { Switch } from "@/app/components/ui/switch";
import { Copy, RefreshCw, Cpu } from "lucide-react";
import { toast } from "@/app/hooks/use-toast";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
        style: {
          background: "#2b213a",
          border: "1px solid #ff00ff",
          color: "#00ffff",
        },
      });
    });
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-purple-500">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center">
          <Cpu className="mr-2 h-8 w-8" />
          4M Password Generator
        </h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input
              value={password}
              readOnly
              className="flex-grow bg-gray-700 text-cyan-300 border-cyan-500 focus:border-pink-500 transition-colors duration-300"
            />
            <Button
              onClick={copyToClipboard}
              size="icon"
              variant="outline"
              className="bg-gray-700 border-purple-500 hover:bg-purple-700 transition-colors duration-300"
            >
              <Copy className="h-4 w-4 text-cyan-300" />
            </Button>
            <Button
              onClick={generatePassword}
              size="icon"
              className="bg-pink-600 hover:bg-pink-700 transition-colors duration-300"
            >
              <RefreshCw className="h-4 w-4 text-white" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="length" className="text-cyan-300">
                  Length: {length}
                </Label>
                <Slider
                  id="length"
                  min={8}
                  max={32}
                  step={1}
                  value={[length]}
                  onValueChange={(value: SetStateAction<number>[]) =>
                    setLength(value[0])
                  }
                  className="w-2/3"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="text-cyan-300">
                Include Uppercase
              </Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
                className="data-[state=checked]:bg-pink-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="text-cyan-300">
                Include Lowercase
              </Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
                className="data-[state=checked]:bg-pink-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="text-cyan-300">
                Include Numbers
              </Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
                className="data-[state=checked]:bg-pink-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="text-cyan-300">
                Include Symbols
              </Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
                className="data-[state=checked]:bg-pink-500"
              />
            </div>
          </div>
          <Button
            onClick={generatePassword}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
          >
            Generate Password
          </Button>
        </div>
      </div>
    </div>
  );
}

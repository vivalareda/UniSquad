"use client";

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Diploma {
  name: string;
  school: string;
}

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: user?.firstName || "",
    discordHandle: "",
    diplomas: [] as Diploma[],
  });

  const handleAddDiploma = () => {
    setFormData({
      ...formData,
      diplomas: [...formData.diplomas, { name: "", school: "" }],
    });
  };

  const handleDiplomaChange = (
    index: number,
    field: keyof Diploma,
    value: string,
  ) => {
    const newDiplomas = [...formData.diplomas];
    newDiplomas[index] = {
      ...newDiplomas[index],
      [field]: value,
    };
    setFormData({ ...formData, diplomas: newDiplomas });
  };

  const handleRemoveDiploma = (index: number) => {
    const newDiplomas = formData.diplomas.filter((_, i) => i !== index);
    setFormData({ ...formData, diplomas: newDiplomas });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post("/api/user", formData);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "Something went wrong");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullName || "",
        discordHandle: "",
        diplomas: [],
      });
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Completer votre profil
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discord
            </label>
            <Input
              type="text"
              value={formData.discordHandle}
              onChange={(e) =>
                setFormData({ ...formData, discordHandle: e.target.value })
              }
              className="mt-1"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Diplomas</h2>
              <Button
                type="button"
                onClick={handleAddDiploma}
                variant="outline"
              >
                Ajouter Diplome
              </Button>
            </div>

            {formData.diplomas.map((diploma, index) => (
              <div key={index} className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Diplome
                  </label>
                  <Input
                    type="text"
                    value={diploma.name}
                    onChange={(e) =>
                      handleDiplomaChange(index, "name", e.target.value)
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School
                  </label>
                  <Input
                    type="text"
                    value={diploma.school}
                    onChange={(e) =>
                      handleDiplomaChange(index, "school", e.target.value)
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => handleRemoveDiploma(index)}
                  className="mt-2"
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}

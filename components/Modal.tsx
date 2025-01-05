"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { PlusCircle } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreatePostModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    class: "",
    numOfTeammates: 1,
    description: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      course: "",
      class: "",
      numOfTeammates: 1,
      description: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/create-post", formData);
      setOpen(false);
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          router.push("/sign-in");
        }

        if (error.response?.status === 404) {
          router.push("/onboarding");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Creer un poste
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Faire une demande de recherche</DialogTitle>
          <DialogDescription>
            Ajoutez les détails ci-dessous pour trouver des coéquipiers
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre</label>
            <Input
              placeholder=""
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sigle</label>
            <Input
              placeholder="e.g. Computer Science"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Groupe</label>
            <Input
              placeholder="e.g. CS401"
              value={formData.class}
              onChange={(e) =>
                setFormData({ ...formData, class: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Ajouter une description si vous les souhaitez 
              e.g. je suis tres fort en... mais moins bon dans..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Besoin de plusieurs coéquipiers?
            </label>
            <Select
              value={formData.numOfTeammates.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, numOfTeammates: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selection le nombre de coéquipier" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "coéquipier" : "coéquipiers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onCloseAction()}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Création..." : "Création du poste"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

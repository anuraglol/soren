"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createEvent } from "@/lib/actions/event";
import { CreateEventFormValues, createEventSchema } from "@/lib/validations";

import { Controller } from "react-hook-form";
import { ImageUpload } from "@/components/image-upload";
import { useUser } from "@civic/auth-web3/react";

export default function CreateEventDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateEventFormValues) => {
      return await createEvent(data, user?.id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully");
    },
    onError: (e) => {
      toast.error("Error creating event");
      console.error(e);
    },
    onSettled: () => setOpen(false),
  });

  const onSubmit = (data: CreateEventFormValues) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-2">Create a New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ImageUpload
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full my-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending && <Loader2 className="mr-2 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

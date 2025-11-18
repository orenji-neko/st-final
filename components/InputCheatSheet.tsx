"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const formSchema = z.object({
  // Text inputs
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters.")
    .max(200, "Bio must be less than 200 characters."),

  // Selection inputs
  role: z.enum(["user", "admin", "moderator"]),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  interests: z.array(z.string()).min(1, "Select at least one interest."),
  plan: z.enum(["free", "pro", "enterprise"]),

  // Range inputs
  volume: z.number().min(0).max(100),

  // Toggle inputs
  bold: z.boolean(),
  textAlign: z.enum(["left", "center", "right"]),
});

type FormValues = z.infer<typeof formSchema>;

export function FormCheatSheet() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      notifications: false,
      theme: "system",
      interests: [],
      plan: "free",
      volume: 50,
      bold: false,
      textAlign: "left",
    },
  });

  function onSubmit(data: FormValues) {
    toast("Form submitted successfully!", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[340px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shadcn Form Components Cheat Sheet</CardTitle>
        <CardDescription>
          A comprehensive example of all form components using react-hook-form
          and Zod validation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-cheatsheet" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6">
            {/* Text Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Text Inputs</h3>

              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your username"
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bio">Bio</FieldLabel>
                    <Textarea
                      {...field}
                      id="bio"
                      aria-invalid={fieldState.invalid}
                      placeholder="Tell us about yourself"
                      className="min-h-24 resize-none"
                    />
                    <FieldDescription>
                      {field.value.length}/200 characters
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Selection Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selection Inputs</h3>

              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Role</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="plan"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Subscription Plan</FieldLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="free" />
                        <FieldLabel htmlFor="free" className="font-normal">
                          Free
                        </FieldLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pro" id="pro" />
                        <FieldLabel htmlFor="pro" className="font-normal">
                          Pro
                        </FieldLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <FieldLabel
                          htmlFor="enterprise"
                          className="font-normal"
                        >
                          Enterprise
                        </FieldLabel>
                      </div>
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="interests"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Interests</FieldLabel>
                    <div className="space-y-2">
                      {["technology", "sports", "music", "art"].map(
                        (interest) => (
                          <div
                            key={interest}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={interest}
                              checked={field.value?.includes(interest)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...field.value, interest]
                                  : field.value.filter(
                                      (v: string) => v !== interest
                                    );
                                field.onChange(updatedValue);
                              }}
                            />
                            <FieldLabel
                              htmlFor={interest}
                              className="font-normal capitalize"
                            >
                              {interest}
                            </FieldLabel>
                          </div>
                        )
                      )}
                    </div>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="notifications"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="notifications"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="notifications"
                        className="font-normal"
                      >
                        Enable notifications
                      </FieldLabel>
                    </div>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Range Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Range Inputs</h3>

              <Controller
                name="volume"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Volume: {field.value}%</FieldLabel>
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Toggle Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Toggle Inputs</h3>

              <Controller
                name="bold"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Text Formatting</FieldLabel>
                    <div className="flex items-center space-x-2">
                      <Toggle
                        pressed={field.value}
                        onPressedChange={field.onChange}
                        aria-label="Toggle bold"
                      >
                        B
                      </Toggle>
                      <FieldLabel className="font-normal">
                        Bold: {field.value ? "On" : "Off"}
                      </FieldLabel>
                    </div>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="textAlign"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Text Alignment</FieldLabel>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex space-x-1"
                    >
                      <ToggleGroupItem value="left" aria-label="Align left">
                        Left
                      </ToggleGroupItem>
                      <ToggleGroupItem value="center" aria-label="Align center">
                        Center
                      </ToggleGroupItem>
                      <ToggleGroupItem value="right" aria-label="Align right">
                        Right
                      </ToggleGroupItem>
                    </ToggleGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset Form
        </Button>
        <Button type="submit" form="form-cheatsheet">
          Submit Form
        </Button>
      </CardFooter>
    </Card>
  );
}

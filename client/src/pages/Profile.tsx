import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertUserSchema, type User } from "@shared/schema";
import { INDIAN_CITIES, EXPERIENCE_LEVELS } from "@/lib/constants";

const updateProfileSchema = insertUserSchema.partial().omit({ password: true });
type UpdateProfileData = typeof updateProfileSchema._type;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Mock user ID - in a real app, this would come from auth context
  const userId = 1;
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: user ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      location: user.location || "",
      experience: user.experience || "",
      skills: user.skills || [],
    } : {},
  });

  // Update form values when user data is loaded
  React.useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        location: user.location || "",
        experience: user.experience || "",
        skills: user.skills || [],
      });
    }
  }, [user, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const formData = new FormData();
      
      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            formData.append(key, value.join(','));
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      
      // Add resume file if selected
      if (selectedFile) {
        formData.append('resume', selectedFile);
      }
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile updated successfully!",
        description: "Your changes have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}`] });
      setIsEditing(false);
      setSelectedFile(null);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    },
  });

  const onSubmit = (data: UpdateProfileData) => {
    // Convert skills string to array if needed
    if (typeof data.skills === 'string') {
      data.skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    updateProfileMutation.mutate(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
              </div>
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            My Profile
          </h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.profilePicture || undefined} />
                <AvatarFallback className="text-2xl">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {user.email}
              </p>
              {user.location && (
                <div className="flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {user.location}
                </div>
              )}
              {user.experience && (
                <Badge variant="secondary" className="mb-4">
                  {user.experience}
                </Badge>
              )}
              {user.resumeUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-download mr-2"></i>
                    View Resume
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INDIAN_CITIES.map((city) => (
                                <SelectItem key={city} value={city.toLowerCase()}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {EXPERIENCE_LEVELS.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="React, Node.js, Python..."
                              value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Separate skills with commas
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Resume
                      </label>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        disabled={updateProfileMutation.isPending}
                        className="flex-1"
                      >
                        {updateProfileMutation.isPending ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Full Name
                    </h3>
                    <p className="text-slate-900 dark:text-slate-100">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Email
                    </h3>
                    <p className="text-slate-900 dark:text-slate-100">{user.email}</p>
                  </div>

                  {user.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Phone
                      </h3>
                      <p className="text-slate-900 dark:text-slate-100">{user.phone}</p>
                    </div>
                  )}

                  {user.location && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Location
                      </h3>
                      <p className="text-slate-900 dark:text-slate-100">{user.location}</p>
                    </div>
                  )}

                  {user.experience && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Experience Level
                      </h3>
                      <p className="text-slate-900 dark:text-slate-100">{user.experience}</p>
                    </div>
                  )}

                  {user.skills && user.skills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

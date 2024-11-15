import React, { useState, useCallback } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
    // State to track the selected category and form data
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState({
        art: "",
        tech: "",
        cultural: "",
    });

    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        description: "",
        images: [],
    });

    // Handle form input changes
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    // Handle file input change (allow up to 5 images)
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Check if adding the new files will exceed the limit of 5 files
        if (files.length + formData.images.length > 5) {
            toast.error("You can upload a maximum of 5 images.");
            return;
        }

        // Update formData with the selected files
        setFormData((prev) => {
            const updatedImages = prev.images.concat(files);
            return { ...prev, images: updatedImages };
        });

        // Show toast with the number of selected files
        toast.success(`${files.length + formData.images.length} file(s) selected.`);
    };



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if less than 1 image is selected
        if (formData.images.length <= 0) {
            toast.error("Please select at least 1 image.");
            return;
        }

        // Create form data to send to the backend
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phoneNumber", formData.phone);
        formDataToSend.append("collegeName", formData.college);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("category", selectedCategory[activeCategory]);

        // Append the images to FormData
        for (let i = 0; i < formData.images.length; i++) {
            formDataToSend.append("images", formData.images[i]);
        }

        try {
            const response = await fetch("https://festynerabackend.vercel.app/api/submissions", {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Submission successful!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    college: "",
                    description: "",
                    images: [],
                }); // Reset form data
                setActiveCategory(null);
            } else {
                toast.error(result.message || "Submission failed.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Something went wrong. Please try again!");
        }
    };

    // Memoized SubmissionForm component
    const SubmissionForm = React.memo(({ formData, handleChange, handleFileChange, handleSubmit }) => {
        return (
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Name"
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email ID"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Phone Number"
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="college"
                    autoComplete="organization"
                    placeholder="College Name"
                    className="input"
                    value={formData.college}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Short Description"
                    className="textarea"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <div className="file-input-wrapper">
                    <input
                        key={formData.images.length} // Force re-render on change
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        className="file-input"
                        onChange={handleFileChange}
                    />
                    {/* Display the count of selected files */}
                    <p className="file-count">{formData.images.length} file(s) selected</p>
                </div>
                <Button type="submit" className="w-full mt-2">
                    Submit Entry
                </Button>
            </form>
        );
    });

    // Toggle form visibility
    const handleShowForm = (category) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-gray-200 px-12">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-xl font-medium">Festyn Era</h2>
                    <Avatar>
                        <AvatarFallback>FE</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <div className="px-0 lg:px-12">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h1 className="text-2xl md:text-5xl lg:text-3xl font-normal leading-tight">
                                Welcome to
                                <span className="relative block text-6xl lg:text-6xl mt-2 font-bold bg-gradient-to-br from-[#4B0082] to-[#FF5733] text-transparent bg-clip-text">
                                    FestynEra
                                </span>
                            </h1>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="/placeholder.svg?height=300&width=500"
                                alt="Festyn Era"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="container mx-auto px-4 mb-20">
                    <h2 className="text-2xl mb-8">Select a category to submit your work</h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Art Events Card */}
                        <Card className="transition-transform hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>Art Events</CardTitle>
                                <p className="text-sm text-gray-500">Upload your Art here</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Select onValueChange={(value) => setSelectedCategory((prev) => ({ ...prev, art: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select art" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nailart">NAIL ART</SelectItem>
                                        <SelectItem value="mehendi">MEHENDI</SelectItem>
                                        <SelectItem value="rangoli">RANGOLI</SelectItem>
                                        <SelectItem value="postermaking">POSTER MAKING</SelectItem>
                                        <SelectItem value="bestoutofwaste">BEST OUT OF WASTE</SelectItem>
                                        <SelectItem value="photography">PHOTOGRAPHY</SelectItem>
                                        <SelectItem value="resinart">RESIN ART</SelectItem>
                                        <SelectItem value="sandart">SAND ART</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="w-full" onClick={() => handleShowForm("art")}>Submit here</Button>
                                {activeCategory === "art" && <SubmissionForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />}
                            </CardContent>
                        </Card>

                        {/* Tech Events Card */}
                        <Card className="transition-transform hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>Tech Events</CardTitle>
                                <p className="text-sm text-gray-500">Upload your Tech submission here</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Select onValueChange={(value) => setSelectedCategory((prev) => ({ ...prev, tech: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Tech" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="webdev">Web Dev</SelectItem>
                                        <SelectItem value="appdev">App Dev</SelectItem>
                                        <SelectItem value="android">Android</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="w-full" onClick={() => handleShowForm("tech")}>Submit here</Button>
                                {activeCategory === "tech" && <SubmissionForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />}
                            </CardContent>
                        </Card>

                        {/* Cultural Events Card */}
                        <Card className="transition-transform hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>Cultural Events</CardTitle>
                                <p className="text-sm text-gray-500">Upload your cultural submission here</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Select onValueChange={(value) => setSelectedCategory((prev) => ({ ...prev, cultural: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Cultural" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dance">Dance</SelectItem>
                                        <SelectItem value="singing">Singing</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="w-full" onClick={() => handleShowForm("cultural")}>Submit here</Button>
                                {activeCategory === "cultural" && <SubmissionForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />}
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;

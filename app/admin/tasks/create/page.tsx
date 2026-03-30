"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { TASK_TEMPLATES, categoryIcon } from "@/lib/taskTemplates";
import { TaskTemplate } from "@/lib/taskTemplates";

interface TaskFormData {
  title: string;
  category: string;
  xlmReward: number;
  proofType: "self_report" | "photo";
  whyItMatters: string;
  steps: { title: string; description?: string }[];
  isTraditional: boolean;
  culture?: string;
}

export default function CreateTaskPage() {
  const router = useRouter();
  const [step, setStep] = useState<"template" | "form">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    category: "",
    xlmReward: 0,
    proofType: "self_report",
    whyItMatters: "",
    steps: [],
    isTraditional: false,
    culture: ""
  });

  const handleTemplateSelect = (template: TaskTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      title: template.title,
      category: template.category,
      xlmReward: template.xlmReward,
      proofType: template.proofType,
      whyItMatters: template.whyItMatters,
      steps: template.steps,
      isTraditional: template.isTraditional,
      culture: template.culture || ""
    });
    setStep("form");
  };

  const handleStartFromScratch = () => {
    setSelectedTemplate(null);
    setFormData({
      title: "",
      category: "",
      xlmReward: 0,
      proofType: "self_report",
      whyItMatters: "",
      steps: [{ title: "", description: "" }],
      isTraditional: false,
      culture: ""
    });
    setStep("form");
  };

  const handleInputChange = (field: keyof TaskFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (index: number, field: "title" | "description", value: string) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { title: "", description: "" }]
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the data to your API
    console.log("Task data:", formData);
    // For now, just navigate back
    router.push("/admin");
  };

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 px-4 sm:px-6 bg-cream min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="font-serif text-3xl font-bold text-earth">
                Create New Health Task
              </h1>
              <p className="text-muted mt-1">
                {step === "template" 
                  ? "Choose a template to get started quickly or create from scratch"
                  : "Customize your task details"
                }
              </p>
            </div>
          </div>

          {step === "template" ? (
            /* Template Selection Step */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-earth">
                  Start with a Template
                </h2>
                <Button
                  variant="outline"
                  onClick={handleStartFromScratch}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Start from Scratch
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TASK_TEMPLATES.map((template, index) => (
                  <div
                    key={index}
                    onClick={() => handleTemplateSelect(template)}
                    className="bg-white rounded-xl p-6 border border-[#E8D4C0] hover:border-[#C05A2B] cursor-pointer transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{categoryIcon[template.category]}</span>
                        <div>
                          <h3 className="font-semibold text-earth">{template.title}</h3>
                          <p className="text-sm text-muted capitalize">
                            {template.category.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#C05A2B]">{template.xlmReward} XLM</p>
                        <p className="text-xs text-muted capitalize">
                          {template.proofType.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted line-clamp-2">
                      {template.whyItMatters}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs bg-[#F5E6D9] text-[#C05A2B] px-2 py-1 rounded-full capitalize">
                        {template.steps.length} steps
                      </span>
                      {template.isTraditional && (
                        <span className="text-xs bg-[#E8F5E8] text-[#2D7D2D] px-2 py-1 rounded-full">
                          Traditional
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Form Step */
            <form onSubmit={handleSubmit} className="space-y-6">
              {selectedTemplate && (
                <div className="bg-[#F5E6D9] border border-[#E8D4C0] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#C05A2B]" />
                    <span className="text-sm font-semibold text-[#C05A2B]">
                      Started from template
                    </span>
                  </div>
                  <p className="text-sm text-muted">
                    {selectedTemplate.title} • {selectedTemplate.category.replace('_', ' ')} • {selectedTemplate.xlmReward} XLM
                  </p>
                </div>
              )}

              {/* Basic Information */}
              <div className="bg-white rounded-xl p-6 border border-[#E8D4C0]">
                <h3 className="text-lg font-semibold text-earth mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-earth mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-4 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-4 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="exercise">Exercise</option>
                        <option value="mental_health">Mental Health</option>
                        <option value="maternal">Maternal</option>
                        <option value="traditional">Traditional Medicine</option>
                        <option value="hygiene">Hygiene</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        XLM Reward
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.xlmReward}
                        onChange={(e) => handleInputChange("xlmReward", parseFloat(e.target.value))}
                        className="w-full px-4 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Proof Type
                      </label>
                      <select
                        value={formData.proofType}
                        onChange={(e) => handleInputChange("proofType", e.target.value)}
                        className="w-full px-4 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                        required
                      >
                        <option value="self_report">Self Report</option>
                        <option value="photo">Photo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Traditional Medicine
                      </label>
                      <select
                        value={formData.isTraditional.toString()}
                        onChange={(e) => handleInputChange("isTraditional", e.target.value === "true")}
                        className="w-full px-4 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                  </div>

                  {formData.isTraditional && (
                    <div>
                      <label className="block text-sm font-medium text-earth mb-2">
                        Culture/Origin
                      </label>
                      <input
                        type="text"
                        value={formData.culture}
                        onChange={(e) => handleInputChange("culture", e.target.value)}
                        className="w-full px-4 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                        placeholder="e.g., East African, Ayurvedic, Indigenous"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-earth mb-2">
                      Why It Matters
                    </label>
                    <textarea
                      value={formData.whyItMatters}
                      onChange={(e) => handleInputChange("whyItMatters", e.target.value)}
                      className="w-full px-4 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Task Steps */}
              <div className="bg-white rounded-xl p-6 border border-[#E8D4C0]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-earth">Task Steps</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStep}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.steps.map((step, index) => (
                    <div key={index} className="border border-[#E8D4C0] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-earth">Step {index + 1}</h4>
                        {formData.steps.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStep(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-earth mb-1">
                            Step Title
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => handleStepChange(index, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                            placeholder="e.g., Drink 8 glasses of water"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-earth mb-1">
                            Description (Optional)
                          </label>
                          <textarea
                            value={step.description || ""}
                            onChange={(e) => handleStepChange(index, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-[#E8D4C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C05A2B]"
                            rows={2}
                            placeholder="Additional instructions or details"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("template")}
                >
                  Back to Templates
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#C05A2B] hover:bg-[#A04A22] text-white"
                  >
                    Create Task
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

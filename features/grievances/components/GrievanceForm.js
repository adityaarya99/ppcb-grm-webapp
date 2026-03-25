"use client";

/**
 * GrievanceForm Component
 * Form for submitting new grievances
 */

import { useState } from "react";
import { Button, Input, Card } from "@/components/ui";
import { useGrievanceForm } from "../hooks/useGrievanceForm";

export default function GrievanceForm({ onSubmit }) {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useGrievanceForm(onSubmit);

  return (
    <Card variant="elevated" className="max-w-2xl mx-auto">
      <Card.Header>
        <h2 className="text-xl font-semibold text-gray-900">
          Submit a Grievance
        </h2>
        <p className="text-gray-500 mt-1">
          Fill in the details below to register your complaint
        </p>
      </Card.Header>

      <Card.Body>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
          </div>

          <Input
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          <div className="w-full">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">Select a category</option>
              <option value="air">Air Pollution</option>
              <option value="water">Water Pollution</option>
              <option value="noise">Noise Pollution</option>
              <option value="waste">Waste Management</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="Describe your grievance in detail..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <Input
            label="Location"
            id="location"
            placeholder="Enter the location of the issue"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            required
          />
        </form>
      </Card.Body>

      <Card.Footer className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={resetForm} disabled={isSubmitting}>
          Reset
        </Button>
        <Button type="submit" loading={isSubmitting} onClick={handleSubmit}>
          Submit Grievance
        </Button>
      </Card.Footer>
    </Card>
  );
}

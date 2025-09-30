import React, { useContext, useEffect, useRef, useState } from "react";
import { AppConetxt } from "../context/context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProject = () => {
  const { allProjects, backendUrl, navigate } = useContext(AppConetxt);
  const { id } = useParams();

  const inputFeatureRef = useRef();
  const inputGalleryRef = useRef();
  const browcherPdfInputRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [editableProject, setEditableProject] = useState(null);

  const [form, setForm] = useState({
    name: "",
    builder: "",
    location: "",
    description: "",
    status: "",
    videoLink: "",
  });

  const [features, setFeatures] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]); // existing images from server (objects with _id, path, filename)
  const [newGalleryImages, setNewGalleryImages] = useState([]); // client-side selected images (with preview)
  const [browcherPdf, setBrowcherPdf] = useState(null);
  const [pdfChanged, setPdfChanged] = useState(false);

  const [layouts, setLayouts] = useState([]); // existing layouts from server (each has _id, title, area, price, image)
  const [newLayouts, setNewLayouts] = useState([]); // newly added or updated layouts (use _id for keys, imagePreview for new file previews)

  useEffect(() => {
    const found = allProjects?.find((p) => p._id === id);
    if (found) {
      setEditableProject(found);
      setForm({
        name: found.name || "",
        builder: found.builder || "",
        location: found.location || "",
        description: found.description || "",
        status: found.status || "",
        videoLink: found.videoLink || "",
      });

      setFeatures(found.features || []);
      setGalleryImages(found.galleryImages || []);
      setLayouts(found.layouts || []);
      setNewGalleryImages([]);
      setNewLayouts([]);
      setBrowcherPdf(found.browcherPdf || null);
      setPdfChanged(false);
    }
  }, [id, allProjects]);

  // Clean up object URLs for previews when they change or on unmount
  useEffect(() => {
    return () => {
      newGalleryImages.forEach((g) => URL.revokeObjectURL(g.preview));
      newLayouts.forEach(
        (l) => l.imagePreview && URL.revokeObjectURL(l.imagePreview)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newGalleryImages, newLayouts]);

  // Form input handler
  const handleform = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Features handling
  const handlefeatures = () => {
    const text = inputFeatureRef.current?.value?.trim();
    if (text && !features.includes(text)) {
      setFeatures((prev) => [...prev, text]);
      if (inputFeatureRef.current) inputFeatureRef.current.value = "";
    }
  };
  const removeFeature = (tag) =>
    setFeatures((prev) => prev.filter((f) => f !== tag));

  // Gallery images handlers
  const onGalleryButtonClick = () => inputGalleryRef.current?.click();
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newFiles = files.map((file, idx) => ({
      id: Date.now() + idx,
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewGalleryImages((prev) => [...prev, ...newFiles]);
  };
  const removeGalleryImage = (id) => {
    // remove existing server image
    setGalleryImages((prev) => prev.filter((img) => img._id !== id));
  };
  const removeNewGalleryImage = (id) => {
    const rem = newGalleryImages.find((g) => g.id === id);
    if (rem?.preview) URL.revokeObjectURL(rem.preview);
    setNewGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Brochure / PDF
  const HandleBrowcherChange = (e) => {
    setPdfChanged(true);
    const file = e.target.files?.[0];
    setBrowcherPdf(file);
  };
  const onBrowcherButtonClick = () => browcherPdfInputRef.current?.click();

  // Layout handlers
  const handleAddlayout = () => {
    // use _id to stay consistent with existing layout objects
    setNewLayouts((prev) => [
      ...prev,
      {
        _id: Date.now(), // use _id so other handlers match
        title: "",
        area: "",
        price: "",
        image: null,
        imagePreview: null,
      },
    ]);
  };

  const removeLayout = (id) => {
    // remove existing layout (server ones)
    setLayouts((prev) => prev.filter((l) => l._id !== id));
  };

  const removeNewLayout = (id) => {
    setNewLayouts((prev) => {
      const rem = prev.find((l) => l._id === id);
      if (rem?.imagePreview) URL.revokeObjectURL(rem.imagePreview);
      return prev.filter((l) => l._id !== id);
    });
  };

  const handleLayoutChange = (id, e) => {
    const { name, value } = e.target;
    setLayouts((prev) =>
      prev.map((l) => (l._id === id ? { ...l, [name]: value } : l))
    );
  };

  const handleNewLayoutChange = (id, e) => {
    const { name, value } = e.target;
    setNewLayouts((prev) =>
      prev.map((l) => (l._id === id ? { ...l, [name]: value } : l))
    );
  };

  // For layout image changes on existing layouts: move the layout to newLayouts with preview
  const handleLayoutImageChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const removedLayout = layouts.find((l) => l._id === id);
    if (!removedLayout) return;

    setLayouts((prev) => prev.filter((l) => l._id !== id));

    const updatedLayout = {
      ...removedLayout,
      image: file,
      imagePreview: URL.createObjectURL(file),
      // keep _id same so server can match if needed
    };
    setNewLayouts((prev) => [...prev, updatedLayout]);
  };

  // For layout image changes on new layouts:
  const handleNewLayoutImageChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewLayouts((prev) =>
      prev.map((l) =>
        l._id === id
          ? { ...l, image: file, imagePreview: URL.createObjectURL(file) }
          : l
      )
    );
  };

  const discard = () => navigate("/allProjects");

  // Submit handler
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);

      const fd = new FormData();
      fd.append("id", id);
      fd.append("name", form.name);
      fd.append("builder", form.builder);
      fd.append("location", form.location);
      fd.append("description", form.description);
      fd.append("status", form.status);
      fd.append("features", JSON.stringify(features));
      fd.append("videoLink", form.videoLink);
      fd.append("pdfChanged", pdfChanged);
      if (browcherPdf) fd.append("browcherPdf", browcherPdf);

      // existing gallery images (server-side references)
      fd.append("galleryImages", JSON.stringify(galleryImages || []));

      // newly added gallery files
      newGalleryImages.forEach((img) =>
        fd.append("galleryNewImages", img.file)
      );

      // existing layouts (with their metadata)
      fd.append(
        "layouts",
        JSON.stringify(
          (layouts || []).map(({ _id, title, area, price }) => ({
            _id,
            title,
            area,
            price,
          }))
        )
      );

      // new/updated layouts metadata
      fd.append(
        "newLayouts",
        JSON.stringify(
          (newLayouts || []).map(({ _id, title, area, price }) => ({
            _id,
            title,
            area,
            price,
          }))
        )
      );

      // their files
      newLayouts.forEach((layout) => {
        if (layout.image) fd.append("newlayoutImages", layout.image);
      });

      const response = await axios.post(
        `${backendUrl}/project/updateProject`,
        fd,
        {}
      );

      if (response.data.success) {
        toast.success("Project Updated Successfully", { autoClose: 2000 });
        navigate("/allprojects");
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating project");
    } finally {
      setSubmitting(false);
    }
  };

  if (!editableProject) {
    return <p className="text-center mt-4 text-gray-300">Loading project…</p>;
  }

  return (
    <div className="relative min-h-screen p-5 flex items-center justify-center px-4 overflow-hidden">
      <div className="relative bg-black backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-6 max-w-4xl w-full">
        {" "}
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          ✏️ Update Project
        </h1>
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col gap-6 text-sm text-gray-200"
        >
          {/* Project Name and Builder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-200">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleform}
                className="border border-gray-600 rounded-md bg-gray-800 text-white p-2 focus:ring-2 focus:ring-blue-500"
                value={form.name}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-200">
                Builder Name
              </label>
              <input
                type="text"
                name="builder"
                onChange={handleform}
                className="border border-gray-600 rounded-md bg-gray-800 text-white p-2 focus:ring-2 focus:ring-blue-500"
                value={form.builder}
              />
            </div>
          </div>

          {/* Location and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-200">Location</label>
              <input
                type="text"
                name="location"
                onChange={handleform}
                className="border border-gray-600 rounded-md bg-gray-800 text-white p-2 focus:ring-2 focus:ring-blue-500"
                value={form.location}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-200">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleform}
                className="border border-gray-600 rounded-md bg-gray-800 text-white p-2 focus:ring-2 focus:ring-blue-500"
              >
                {/* use lowercase values to match AddProject */}
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Video Link */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Video Link</label>
            <textarea
              name="videoLink"
              onChange={handleform}
              className="border border-gray-600 rounded-md bg-gray-800 text-white p-2 focus:ring-2 focus:ring-blue-500 min-h-[60px]"
              value={form.videoLink}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleform}
              className="border border-gray-600 rounded-md bg-gray-800 text-white p-2 focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              value={form.description}
            />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                placeholder="Enter feature"
                ref={inputFeatureRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    handlefeatures();
                  }
                }}
                className="border border-gray-600 flex-1 rounded-md bg-gray-800 text-white p-2 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handlefeatures}
                className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((f, idx) => (
                <span
                  key={idx}
                  className="relative bg-blue-600/20 border border-blue-500 text-blue-300 rounded-md px-3 py-1 text-sm"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeFeature(f)}
                    className="absolute -top-1 -right-1 bg-red-600 rounded-full text-white px-1"
                    aria-label={`Remove ${f}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Brochure PDF */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-200">
              Project Brochure
            </label>
            <span className="text-gray-400">
              {browcherPdf && browcherPdf.name}
            </span>
            <div>
              <input
                type="file"
                ref={browcherPdfInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={HandleBrowcherChange}
              />
              <button
                type="button"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                onClick={onBrowcherButtonClick}
              >
                Upload PDF
              </button>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-200">
                Gallery Images
              </label>
              <div>
                <input
                  ref={inputGalleryRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryChange}
                />
                <button
                  type="button"
                  onClick={onGalleryButtonClick}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Add Images
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {galleryImages.map((img) => (
                <div key={img._id} className="relative">
                  <img
                    src={img.path}
                    alt={img.filename || "gallery"}
                    className="h-20 w-20 object-cover rounded-md border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(img._id)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                  <div className="text-xs text-center text-gray-300 mt-1">
                    {img.filename}
                  </div>
                </div>
              ))}

              {newGalleryImages.map((img) => (
                <div key={img.id} className="relative">
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    className="h-20 w-20 object-cover rounded-md border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewGalleryImage(img.id)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2"
                    aria-label="Remove new"
                  >
                    ×
                  </button>
                  <div className="text-xs text-center text-gray-300 mt-1">
                    {img.file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layouts */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-200">Layouts</label>
              <button
                type="button"
                onClick={handleAddlayout}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Add Layout
              </button>
            </div>

            {/* Existing layouts */}
            {layouts.map((l) => (
              <div
                key={l._id}
                className="grid md:grid-cols-2 gap-4 border border-gray-700 p-4 rounded-md bg-gray-800/40"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-gray-200">Title</label>
                  <select
                    value={l.title}
                    name="title"
                    onChange={(e) => handleLayoutChange(l._id, e)}
                    className="border border-gray-600 bg-gray-900 text-white p-2 rounded-md"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                  </select>

                  <label className="text-gray-200">Area (sqft)</label>
                  <input
                    type="number"
                    name="area"
                    value={l.area}
                    onChange={(e) => handleLayoutChange(l._id, e)}
                    className="border border-gray-600 bg-gray-900 text-white p-2 rounded-md"
                  />

                  <label className="text-gray-200">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={l.price}
                    onChange={(e) => handleLayoutChange(l._id, e)}
                    className="border border-gray-600 bg-gray-900 text-white p-2 rounded-md"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <input
                    id={`layoutInput-${l._id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLayoutImageChange(l._id, e)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById(`layoutInput-${l._id}`).click()
                    }
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md mb-2"
                  >
                    Change Image
                  </button>

                  <img
                    src={l.image || l.imagePath || ""}
                    alt="Layout"
                    className="h-24 w-40 object-cover rounded-md border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeLayout(l._id)}
                    className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* New/Updated layouts (client-side) */}
            {newLayouts.map((l) => (
              <div
                key={l._id}
                className="grid md:grid-cols-2 gap-4 border border-gray-700 p-4 rounded-md bg-gray-800/40"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-gray-200">Title</label>
                  <select
                    value={l.title}
                    name="title"
                    onChange={(e) => handleNewLayoutChange(l._id, e)}
                    className="border border-gray-600 bg-gray-900 text-white p-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                  </select>

                  <label className="text-gray-200">Area (sqft)</label>
                  <input
                    type="number"
                    name="area"
                    value={l.area}
                    onChange={(e) => handleNewLayoutChange(l._id, e)}
                    className="border border-gray-600 bg-gray-900 text-white p-2 rounded-md"
                  />

                  <label className="text-gray-200">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={l.price}
                    onChange={(e) => handleNewLayoutChange(l._id, e)}
                    className="border border-gray-600 bg-gray-900 text-white p-2 rounded-md"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <input
                    id={`newLayoutInput-${l._id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleNewLayoutImageChange(l._id, e)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById(`newLayoutInput-${l._id}`).click()
                    }
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md mb-2"
                  >
                    Add / Change Image
                  </button>

                  {l.imagePreview ? (
                    <img
                      src={l.imagePreview}
                      alt="Layout preview"
                      className="h-24 w-40 object-cover rounded-md border border-gray-600"
                    />
                  ) : (
                    <div className="h-24 w-40 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-600 rounded-md">
                      No image
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeNewLayout(l._id)}
                    className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={discard}
              className="px-4 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;

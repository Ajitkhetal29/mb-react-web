import React, { useContext, useEffect, useRef, useState } from "react";
import { AppConetxt } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const AddProject = () => {
  const { backendUrl, navigate,  } = useContext(AppConetxt);

  const [form, setForm] = useState({
    name: "",
    builder: "",
    location: "",
    description: "",
    status: "",
    videoLink: "",
  });

  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const galleryInputRef = useRef(null);
  const layoutImagInputRef = useRef(null);
  const browcherPdfInputRef = useRef(null);
  const [browcherPdf, setBrowcherPdf] = useState(null);

  const [layouts, setLayouts] = useState([
    { id: Date.now(), title: "", area: "", price: "", imageFile: null, imagePreview: null },
  ]);

  const [submitting, setSubmitting] = useState(false);

  // Feature handlers
  const addFeature = () => {
    const tag = featureInput.trim();
    if (!tag) return;
    if (!features.includes(tag)) setFeatures((prev) => [...prev, tag]);
    setFeatureInput("");
  };
  const removeFeature = (tag) => setFeatures((prev) => prev.filter((f) => f !== tag));

  // Gallery handlers
  const onGalleryButtonClick = () => galleryInputRef.current?.click();
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newFiles = files.map((file, idx) => ({
      id: Date.now() + idx,
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryImages((prev) => [...prev, ...newFiles]);
  };
  const removeGalleryImage = (id) =>
    setGalleryImages((prev) => {
      const rem = prev.find((x) => x.id === id);
      if (rem) URL.revokeObjectURL(rem.preview);
      return prev.filter((x) => x.id !== id);
    });

  // Layout handlers
  const addLayout = () =>
    setLayouts((prev) => [
      ...prev,
      { id: Date.now(), title: "", area: "", price: "", imageFile: null, imagePreview: null },
    ]);
  const removeLayout = (id) =>
    setLayouts((prev) => {
      const rem = prev.find((x) => x.id === id);
      if (rem?.imagePreview) URL.revokeObjectURL(rem.imagePreview);
      return prev.filter((x) => x.id !== id);
    });
  const handleLayoutChange = (id, field, value) =>
    setLayouts((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  const handleLayoutImage = (id, e) => {
    const file = e.target.files?.[0];
    setLayouts((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, imageFile: file || null, imagePreview: file ? URL.createObjectURL(file) : null }
          : l
      )
    );
    e.target.value = null;
  };

  // PDF
  const onBrowcherButtonClick = () => browcherPdfInputRef.current?.click();
  const HandleBrowcherChange = (e) => setBrowcherPdf(e.target.files?.[0]);

  // Cleanup
  useEffect(() => {
    return () => {
      galleryImages.forEach((g) => URL.revokeObjectURL(g.preview));
      layouts.forEach((l) => l.imagePreview && URL.revokeObjectURL(l.imagePreview));
    };
  }, []);

  // Submit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name is required");

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      fd.append("features", JSON.stringify(features));
      if (browcherPdf) fd.append("browcherPdf", browcherPdf);
      galleryImages.forEach((g) => fd.append("galleryImages", g.file));
      fd.append(
        "layouts",
        JSON.stringify(layouts.map(({ title, area, price }) => ({ title, area, price })))
      );
      layouts.forEach((l) => l.imageFile && fd.append("layoutImages", l.imageFile));

      const response = await axios.post(`${backendUrl}/project/addProject`, fd, {});
      if (response.data.success) {
        toast.success("Project Added Successfully", { autoClose: 2000 });
        navigate("/allprojects");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen p-6 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 max-w-5xl w-full">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10 tracking-wider text-amber-400 drop-shadow-lg">
          🏡 Add New Project
        </h1>

        <form onSubmit={handleSubmitForm} className="space-y-8 text-white">
          {/* --- Basic Info --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Project Name", key: "name", placeholder: "e.g Skyline Estate" },
              { label: "Builder Name", key: "builder", placeholder: "Builder Name" },
              { label: "Location", key: "location", placeholder: "Location" },
              { label: "Video Link", key: "videoLink", placeholder: "https://..." },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-semibold mb-2 text-amber-300">
                  {label}
                </label>
                <input
                  id={key}
                  type="text"
                  value={form[key]}
                  required
                  placeholder={placeholder}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full rounded-xl border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                />
              </div>
            ))}

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-semibold mb-2 text-amber-300">
                Status
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-xl border border-gray-600 bg-gray-800/70 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              >
                <option value="" disabled className="text-gray-500">
                  Select Status
                </option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2 text-amber-300">
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description"
              className="w-full rounded-xl border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              rows={4}
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-amber-300">Features</label>
            <div className="flex gap-3">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Type a feature and press Enter"
                className="flex-grow rounded-xl border border-gray-600 bg-gray-800/70 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 rounded-xl text-black font-semibold shadow-md transition"
              >
                Add
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {features.map((f) => (
                <div
                  key={f}
                  className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-300 px-4 py-1 rounded-full flex items-center gap-2 text-sm shadow-sm"
                >
                  <span>{f}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(f)}
                    className="text-red-400 hover:text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Brochure */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-amber-300">
              Project Brochure (PDF)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={browcherPdfInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={HandleBrowcherChange}
              />
              <button
                type="button"
                onClick={onBrowcherButtonClick}
                className="px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 rounded-xl text-black font-semibold shadow-md transition"
              >
                Upload PDF
              </button>
              {browcherPdf && (
                <span className="text-sm truncate max-w-xs text-gray-300" title={browcherPdf.name}>
                  {browcherPdf.name}
                </span>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-amber-300">Gallery Images</label>
              <button
                type="button"
                onClick={onGalleryButtonClick}
                className="px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 rounded-xl text-black font-semibold shadow-md transition"
              >
                Add Images
              </button>
            </div>
            <input
              type="file"
              ref={galleryInputRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGalleryChange}
            />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {galleryImages.map((g) => (
                <div
                  key={g.id}
                  className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all"
                >
                  <img src={g.preview} alt={g.file.name} className="w-full h-24 object-cover" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-red-400 hover:text-red-600 transition"
                    onClick={() => removeGalleryImage(g.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Layouts */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-amber-300">Layouts</label>
              <button
                type="button"
                onClick={addLayout}
                className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-400 rounded-xl text-black font-semibold shadow-md transition"
              >
                Add Layout
              </button>
            </div>
            <div className="space-y-6">
              {layouts.map((l) => (
                <div
                  key={l.id}
                  className="border border-gray-700 rounded-xl p-6 bg-gray-800/70 hover:scale-[1.01] transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-amber-300">
                        Title
                      </label>
                      <select
                        value={l.title}
                        onChange={(e) => handleLayoutChange(l.id, "title", e.target.value)}
                        className="w-full rounded-xl border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                      >
                        <option value="">Select</option>
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-amber-300">
                        Area (sq ft)
                      </label>
                      <input
                        type="number"
                        value={l.area}
                        onChange={(e) => handleLayoutChange(l.id, "area", e.target.value)}
                        className="w-full rounded-xl border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-amber-300">
                        Price (Lacs)
                      </label>
                      <input
                        type="number"
                        value={l.price}
                        onChange={(e) => handleLayoutChange(l.id, "price", e.target.value)}
                        className="w-full rounded-xl border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      ref={layoutImagInputRef}
                      className="hidden"
                      onChange={(e) => handleLayoutImage(l.id, e)}
                    />
                    <button
                      type="button"
                      onClick={() => layoutImagInputRef.current?.click()}
                      className="px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 rounded-xl text-black font-semibold shadow-md transition"
                    >
                      Add Image
                    </button>
                  </div>

                  {l.imagePreview && (
                    <div className="mb-4">
                      <img
                        src={l.imagePreview}
                        alt={l.title || "Layout Image"}
                        className="w-40 h-40 object-cover rounded-xl border border-gray-600"
                      />
                      {l.imageFile?.name && (
                        <p className="mt-2 text-sm truncate text-gray-300">{l.imageFile.name}</p>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeLayout(l.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-rose-600 hover:to-red-500 rounded-xl text-white font-semibold shadow-md transition"
                  >
                    Remove Layout
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 rounded-xl text-black font-extrabold tracking-wide shadow-lg hover:shadow-amber-500/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;

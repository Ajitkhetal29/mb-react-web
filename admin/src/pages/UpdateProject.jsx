import React, { useContext, useEffect, useRef, useState } from "react";
import { AppConetxt } from "../context/context";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProject = () => {
  const { allProjects, backendUrl, navigate } = useContext(AppConetxt);
  const { id } = useParams();

  const inputFeatureRef = useRef();
  const inputGalleryRef = useRef();

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
  const [galleryImages, setGalleryImages] = useState([]);
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const [browcherPdf, setBrowcherPdf] = useState(null);
  const browcherPdfInputRef = useRef(null);

  const [layouts, setLayouts] = useState([]);
  const [newLayouts, setNewLayouts] = useState([]);

  useEffect(() => {
    const found = allProjects.find((p) => p._id === id);
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
    }
  }, [id, allProjects]);

  // Form input handler
  const handleform = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Features handling
  const handlefeatures = () => {
    const text = inputFeatureRef.current.value.trim();
    if (text && !features.includes(text)) {
      setFeatures((prev) => [...prev, text]);
      inputFeatureRef.current.value = "";
    }
  };
  const removeFeature = (tag) => {
    setFeatures((prev) => prev.filter((f) => f !== tag));
  };

  // Gallery images handlers
  const onGalleryButtonClick = () => {
    inputGalleryRef.current?.click();
  };
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
    setGalleryImages((prev) => prev.filter((img) => img._id !== id));
  };
  const removeNewGalleryImage = (id) => {
    const rem = newGalleryImages.find((g) => g.id === id);
    if (rem?.preview) URL.revokeObjectURL(rem.preview);
    setNewGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  const HandleBrowcherChange = (e) => {
    const file = e.target.files?.[0];
    setBrowcherPdf(file);
  };

  const onBrowcherButtonClick = () => {
    browcherPdfInputRef.current?.click();
  };

  // Layout handlers
  const handleAddlayout = () => {
    setNewLayouts((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        area: "",
        price: "",
        image: null,
        imagePreview: null,
      },
    ]);
  };
  const removeLayout = (id) => {
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

  // For layout image changes on existing layouts:
  const handleLayoutImageChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Find the layout in existing layouts
    const removedLayout = layouts.find((l) => l._id === id);
    if (!removedLayout) return;
    
    // Remove it from existing layouts
    setLayouts((prev) => prev.filter((l) => l._id !== id));

    // Add it to newLayouts with updated image and preview
    const updatedLayout = {
      ...removedLayout,
      image: file,
      imagePreview: URL.createObjectURL(file),
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

  const discard = () => {
    navigate("/allProjects");
  };

  // Submit handler
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

      const fd = new FormData();
      fd.append("id", id);
      fd.append("name", form.name);
      fd.append("builder", form.builder);
      fd.append("location", form.location);
      fd.append("description", form.description);
      fd.append("status", form.status);
      fd.append("features", JSON.stringify(features));
      fd.append("videoLink", form.videoLink);
      fd.append("browcherPdf", browcherPdf);

      // Existing gallery images as JSON metadata (e.g. URLs or IDs)
      fd.append("galleryImages", JSON.stringify(galleryImages));

      newGalleryImages.forEach((img) => {
        fd.append("galleryNewImages", img.file);
      });

      fd.append(
        "layouts",
        JSON.stringify(
          layouts.map(({ _id, title, area, price, image }) => ({
            _id,
            title,
            area,
            price,
            image, // usually URL string
          }))
        )
      );

      fd.append(
        "newLayouts",
        JSON.stringify(
          newLayouts.map(({ _id, title, area, price }) => ({
            _id,
            title,
            area,
            price,
          }))
        )
      );

      // New layouts images files
      newLayouts.forEach((layout) => {
        if (layout.image) {
          fd.append("newlayoutImages", layout.image);
        }
      });

      // Log all FormData entries for debug
      // for (const [key, value] of fd.entries()) {
      //   console.log(key, value);
      // }
      const response = await axios.post(
        `${backendUrl}/project/updateProject`,
        fd,
        {}
      );

      if (response.data.success) {
        alert(`project updated`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!editableProject) {
    return <p className="text-center mt-4">Loading project…</p>;
  }

  return (
    <div className="p-4 flex flex-col w-full items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Project</h1>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col justify-center p-5 border"
      >
        {/* Project Name and Builder */}
        <div className="flex flex-row gap-5 mt-2">
          <div className="flex flex-col">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              name="name"
              onChange={handleform}
              className="border"
              value={form.name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="builder">Builder Name</label>
            <input
              type="text"
              name="builder"
              onChange={handleform}
              className="border"
              value={form.builder}
            />
          </div>
        </div>

        {/* Location and Status */}
        <div className="flex flex-row gap-5 mt-2">
          <div className="flex flex-col">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleform}
              className="border"
              value={form.location}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="status">Status</label>
            <select name="status" value={form.status} onChange={handleform}>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row mt-2">
          <div className="flex gap-5 w-full flex-col">
            <label htmlFor="videoLink">Video Link</label>
            <textarea
              name="videoLink"
              onChange={handleform}
              className="border w-full flex-1"
              value={form.videoLink}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-row mt-2">
          <div className="flex gap-5 w-full flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleform}
              className="border w-full flex-1"
              value={form.description}
            />
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-row mt-2">
          <div className="flex gap-5 w-full">
            <input
              placeholder="Enter feature"
              ref={inputFeatureRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  handlefeatures();
                }
              }}
              className="border flex-1"
            />
            <button
              type="button"
              onClick={handlefeatures}
              className="px-3 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-2 gap-2 flex-wrap">
          {features.map((f, idx) => (
            <span
              key={idx}
              className="relative bg-gray-200 rounded text-sm px-2 py-1 mr-2 mb-2"
            >
              {f}
              <button
                type="button"
                onClick={() => removeFeature(f)}
                className="absolute top-0 right-0 text-red-600 px-1 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          Project Browcher
          <span>{browcherPdf && browcherPdf.name}</span>
          <div className="flex ">
            <input
              type="file"
              ref={browcherPdfInputRef}
              accept="pdf/*"
              className="hidden"
              onChange={HandleBrowcherChange}
            />
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={onBrowcherButtonClick}
            >
              Add Browcher Pdf
            </button>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="flex flex-col mt-4">
          <div className="flex justify-between items-center">
            <label>Gallery Images</label>
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
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Add Images
              </button>
            </div>
          </div>
          <div className="flex flex-wrap mt-2 gap-3">
            {galleryImages.map((img) => (
              <div key={img._id} className="relative">
                <img
                  src={img.path}
                  alt=""
                  className="h-20 w-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(img._id)}
                  className="absolute top-0 right-0 bg-white rounded-full px-1 text-red-600 font-bold"
                >
                  ×
                </button>
                <div className="text-xs text-center">{img.filename}</div>
              </div>
            ))}
            {newGalleryImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={img.preview}
                  alt=""
                  className="h-20 w-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeNewGalleryImage(img.id)}
                  className="absolute top-0 right-0 bg-white rounded-full px-1 text-red-600 font-bold"
                >
                  ×
                </button>
                <div className="text-xs text-center">{img.file.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Layouts */}
        <div className="flex flex-col mt-6">
          <div className="flex justify-between items-center mb-2">
            <label> Layouts</label>{" "}
            <div className="flex justify-between items-center mb-2">
              <button
                type="button"
                onClick={handleAddlayout}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Add Layout
              </button>
            </div>
          </div>
          {layouts.map((l) => (
            <div
              key={l._id}
              className="flex flex-row gap-4 border p-3 rounded mb-4"
            >
              <div className="flex flex-col gap-2 flex-1">
                <label>Title</label>
                <select
                  value={l.title}
                  name="title"
                  onChange={(e) => handleLayoutChange(l._id, e)}
                  className="border p-1"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                </select>
                <label>Area</label>
                <input
                  type="number"
                  name="area"
                  value={l.area}
                  onChange={(e) => handleLayoutChange(l._id, e)}
                  className="border p-1"
                />
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={l.price}
                  onChange={(e) => handleLayoutChange(l._id, e)}
                  className="border p-1"
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
                  className="px-3 py-1 bg-blue-600 text-white rounded mb-2"
                >
                  Change Image
                </button>
                <img
                  src={l.image}
                  alt="Layout"
                  className="h-20 w-32 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeLayout(l._id)}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
                >
                  Remove Layout
                </button>
              </div>
            </div>
          ))}

          {newLayouts.map((l) => (
            <div
              key={l._id}
              className="flex flex-row gap-4 border p-3 rounded mb-4"
            >
              <div className="flex flex-col gap-2 flex-1">
                <label>Title</label>
                <select
                  value={l.title}
                  name="title"
                  onChange={(e) => handleNewLayoutChange(l._id, e)}
                  className="border p-1"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                </select>
                <label>Area</label>
                <input
                  type="number"
                  name="area"
                  value={l.area}
                  onChange={(e) => handleNewLayoutChange(l._id, e)}
                  className="border p-1"
                />
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={l.price}
                  onChange={(e) => handleNewLayoutChange(l._id, e)}
                  className="border p-1"
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
                  className="px-3 py-1 bg-blue-600 text-white rounded mb-2"
                >
                  Add Image
                </button>
                <img
                  src={l.imagePreview}
                  alt="Layout"
                  className="h-20 w-32 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeNewLayout(l._id)}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
                >
                  Remove Layout
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit buttons */}
        <div className="flex justify-end gap-x-2 mt-6">
          <button
            type="button"
            onClick={discard}
            className="px-4 py-2 border rounded"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;

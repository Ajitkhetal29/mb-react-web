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

  // new
  const logoInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const carouselImagesInputRef = useRef(null);
  const otherVideosInputRef = useRef(null);

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
  const [galleryImages, setGalleryImages] = useState([]);
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const [browcherPdf, setBrowcherPdf] = useState(null);
  const [pdfChanged, setPdfChanged] = useState(false);

  const [layouts, setLayouts] = useState([]);
  const [newLayouts, setNewLayouts] = useState([]);

  console.log("layouts", layouts);

  // new
  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);
  const [otherVideos, setOtherVideos] = useState([]);

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoChanged, setLogoChanged] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState(false);
  const [coverImageChanged, setCoverImageChanged] = useState(false);

  const [newCaraouselImages, setNewCarouselImages] = useState([]);
  const [newOtherVideos, setNewOtherVideos] = useState([]);

  // Load project
  useEffect(() => {
    const found = allProjects?.find((p) => p._id === id);
    console.log("found", found);

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

      // new
      setLogo(found.logo || null);
      setCarouselImages(found.carouselImages || []);
      setCoverImage(found.coverImage || null);
      setOtherVideos(found.otherVideos || []);
    }
  }, [id, allProjects]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      newGalleryImages.forEach((g) => URL.revokeObjectURL(g.preview));
      newLayouts.forEach(
        (l) => l.imagePreview && URL.revokeObjectURL(l.imagePreview)
      );
    };
  }, [newGalleryImages, newLayouts]);

  // --- Handlers ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    const text = inputFeatureRef.current?.value?.trim();
    if (text && !features.includes(text)) {
      setFeatures((prev) => [...prev, text]);
      inputFeatureRef.current.value = "";
    }
  };

  const removeFeature = (f) =>
    setFeatures((prev) => prev.filter((x) => x !== f));

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
  const removeGalleryImage = (id) =>
    setGalleryImages((prev) => prev.filter((img) => img._id !== id));
  const removeNewGalleryImage = (id) => {
    const rem = newGalleryImages.find((g) => g.id === id);
    if (rem?.preview) URL.revokeObjectURL(rem.preview);
    setNewGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  // new

  // logo
  const onLogoButtonClick = () => logoInputRef.current?.click();
  const handleLogoChange = (e) => {
    setLogoChanged(true);
    URL.revokeObjectURL(logoPreview);
    setLogoPreview(null);
    const file = e.target.files?.[0];
    if (file) setLogo(file);
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  };

  // cover image
  const onCoverImageButtonClick = () => coverImageInputRef.current?.click();
  const handleCoverImageChange = (e) => {
    setCoverImageChanged(true);
    URL.revokeObjectURL(coverImagePreview);
    setCoverImagePreview(null);
    const file = e.target.files?.[0];
    if (file) setCoverImage(file);
    setCoverImagePreview(file ? URL.createObjectURL(file) : null);
  };

  // carousel images

  const onCarouselImagesButtonClick = () =>
    carouselImagesInputRef.current?.click();
  const handleCarouselImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newFiles = files.map((file, idx) => ({
      id: Date.now() + idx,
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewCarouselImages((prev) => [...prev, ...newFiles]);
  };

  const removeCarouselImage = (id) =>
    setCarouselImages((prev) => prev.filter((img) => img._id !== id));

  const removeNewCarouselImage = (id) => {
    const rem = newCaraouselImages.find((g) => g.id === id);
    if (rem?.preview) URL.revokeObjectURL(rem.preview);
    setNewCarouselImages((prev) => prev.filter((img) => img.id !== id));
  };

  const onOtherVideosButtonClick = () => otherVideosInputRef.current?.click();
  const handleOtherVideosChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newFiles = files.map((file, idx) => ({
      id: Date.now() + idx,
      file,
    }));
    setNewOtherVideos((prev) => [...prev, ...newFiles]);
  };

  const removeOtherVideo = (id) => {
    console.log("called");
    setOtherVideos((prev) => prev.filter((vid) => vid._id !== id));
    console.log(otherVideos);
  };

  const removeNewOtherVideo = (id) => {
    setNewOtherVideos((prev) => prev.filter((vid) => vid.id !== id));
  };

  const onBrowcherButtonClick = () => browcherPdfInputRef.current?.click();
  const handleBrowcherChange = (e) => {
    setPdfChanged(true);
    setBrowcherPdf(e.target.files?.[0]);
  };

  const handleAddLayout = () => {
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

  const removeLayout = (id) =>
    setLayouts((prev) => prev.filter((l) => l._id !== id));
  const removeNewLayout = (id) => {
    const rem = newLayouts.find((l) => l._id === id);
    if (rem?.imagePreview) URL.revokeObjectURL(rem.imagePreview);
    setNewLayouts((prev) => prev.filter((l) => l._id !== id));
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
      prev.map((l) => (l.id === id ? { ...l, [name]: value } : l))
    );
  };

  const handleLayoutImageChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const removedLayout = layouts.find((l) => l._id === id);
    if (!removedLayout) return;
    setLayouts((prev) => prev.filter((l) => l._id !== id));
    setNewLayouts((prev) => [
      ...prev,
      {
        ...removedLayout,
        image: file,
        imagePreview: URL.createObjectURL(file),
      },
    ]);
  };
  const handleNewLayoutImageChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewLayouts((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, image: file, imagePreview: URL.createObjectURL(file) }
          : l
      )
    );
    
    
  };

  const discard = () => navigate("/allProjects");

  // Submit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
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
      fd.append("logoChanged", logoChanged);
      fd.append("coverImageChanged", coverImageChanged);
      if (browcherPdf) fd.append("browcherPdf", browcherPdf);
      fd.append("galleryImages", JSON.stringify(galleryImages || []));
      fd.append("carouselImages", JSON.stringify(carouselImages || []));
      newGalleryImages.forEach((img) =>
        fd.append("galleryNewImages", img.file)
      );

      fd.append("logo", logo);
      fd.append("coverImage", coverImage);

      newCaraouselImages.forEach((img) =>
        fd.append("newCaraouselImages", img.file)
      );

      fd.append("otherVideos", JSON.stringify(otherVideos || []));

      newOtherVideos.forEach((vid) => fd.append("otherNewVideos", vid.file));

      fd.append("layouts", JSON.stringify(layouts || []));
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
      newLayouts.forEach(
        (l) => l.image && fd.append("newlayoutImages", l.image)
      );

      console.log("coverImag", coverImage);

      const response = await axios.post(
        `${backendUrl}/api/project/updateProject`,
        fd
      );
      if (response.data.success) {
        toast.success("Project Updated Successfully", { autoClose: 2000 });
        navigate("/allprojects");
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating project");
    } finally {
      setSubmitting(false);
    }
  };

  if (!editableProject)
    return <p className="text-center mt-4 text-gray-300">Loading project…</p>;

  return (
    <div className="min-h-screen p-5 flex items-center justify-center bg-gray-900">
      <div className="bg-black backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-6 max-w-5xl w-full space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-white">
          ✏️ Update Project
        </h1>

        <form onSubmit={handleSubmitForm} className="flex flex-col gap-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            {["name", "builder", "location"].map((key) => (
              <div key={key} className="flex flex-col">
                <label className="mb-1 text-gray-200 capitalize">
                  {key.replace("name", "Name")}
                </label>
                <input
                  type="text"
                  name={key}
                  value={form[key]}
                  onChange={handleFormChange}
                  className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label className="mb-1 text-gray-200">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleFormChange}
                className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Video Link & Description */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-200">Video Link</label>
            <textarea
              name="videoLink"
              value={form.videoLink}
              onChange={handleFormChange}
              className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 min-h-[60px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-200">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
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
                    handleAddFeature();
                  }
                }}
                className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((f, i) => (
                <span
                  key={i}
                  className=" bg-white text-black px-2 py-1 rounded-md flex items-center gap-2 text-sm shadow-sm"
                >
                  {f}
                  <button
                    onClick={() => removeFeature(f)}
                    className="text-red-400 hover:text-red-600 "
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Brochure */}
          <div className="flex  gap-2">
            <label className="text-gray-200">Project Brochure</label>
            {!pdfChanged ? (
              <span className="text-sm truncate text-white flex-2">
                {browcherPdf}
              </span>
            ) : (
              <span className="text-sm truncate text-white flex-2">
                {browcherPdf.name}
              </span>
            )}
            <input
              type="file"
              ref={browcherPdfInputRef}
              accept="application/pdf"
              className=" hidden"
              onChange={handleBrowcherChange}
            />
            <button
              type="button"
              onClick={onBrowcherButtonClick}
              className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
            >
              Upload PDF
            </button>
          </div>

          {/* logo */}

          <div>
            <label className="block text-sm text-white mb-2">Logo Image</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={logoInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              <button
                type="button"
                onClick={onLogoButtonClick}
                className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
              >
                Upload Logo
              </button>
              {logoChanged ? (
                <div className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all">
                  <img src={logoPreview} className="w-full h-24 object-cover" />
                </div>
              ) : (
                <div className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all">
                  <img
                    src={`${backendUrl}/${logo}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* cover image */}

          <div>
            <label className="block text-sm text-white mb-2">Cover Image</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={coverImageInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageChange}
              />
              <button
                type="button"
                onClick={onCoverImageButtonClick}
                className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
              >
                Upload Cover
              </button>
              {coverImageChanged ? (
                <div className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all">
                  <img
                    src={coverImagePreview}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ) : (
                <div className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all">
                  <img
                    src={`${backendUrl}/${coverImage}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* carousel */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-200">Caraousel Images</label>
              <div>
                <input
                  ref={carouselImagesInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleCarouselImagesChange}
                />
                <button
                  type="button"
                  onClick={onCarouselImagesButtonClick}
                  className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
                >
                  Add Images
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {carouselImages.map((img) => (
                <div
                  key={img._id}
                  className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all"
                >
                  <img
                    src={`${backendUrl}/${img.image}`}
                    alt={img.title}
                    className="w-full h-24 object-cover"
                  />
                  <button
                    onClick={() => removeCarouselImage(img._id)}
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-red-400 hover:text-red-600 transition"
                  >
                    X
                  </button>
                </div>
              ))}
              {newCaraouselImages.map((img) => (
                <div
                  key={img.id}
                  className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all"
                >
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    className="w-full h-24 object-cover"
                  />
                  <button
                    onClick={() => removeNewCarouselImage(img.id)}
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-red-400 hover:text-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* other videos */}

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-200">Other Videos</label>
              <div>
                <input
                  ref={otherVideosInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={handleOtherVideosChange}
                />
                <button
                  type="button"
                  onClick={onOtherVideosButtonClick}
                  className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
                >
                  Add Video
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {otherVideos.map((g) => (
                <div
                  key={g.id}
                  className="relative border px-5 py-2 border-gray-700 rounded-md overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all"
                >
                  <span className="text-white">{g.title}</span>
                  <button
                    type="button"
                    className="absolute top-0 right-1 bg-black/70  p-1 text-red-400 hover:text-red-600 transition"
                    onClick={() => removeOtherVideo(g._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {newOtherVideos.map((g) => (
                <div
                  key={g.id}
                  className="relative border px-5 py-2 border-gray-700 rounded-md overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all"
                >
                  <span className="text-white">{g.file.name}</span>
                  <button
                    type="button"
                    className="absolute top-0 right-1 bg-black/70  p-1 text-red-400 hover:text-red-600 transition"
                    onClick={() => removeNewOtherVideo(g.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-200">Gallery Images</label>
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
                  className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
                >
                  Add Images
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {galleryImages.map((img) => (
                <div
                  key={img._id}
                  className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all"
                >
                  <img
                    src={`${backendUrl}/${img.image}`}
                    alt={img.title}
                    className="w-full h-24 object-cover"
                  />
                  <button
                    onClick={() => removeGalleryImage(img._id)}
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-red-400 hover:text-red-600 transition"
                  >
                    X
                  </button>
                </div>
              ))}
              {newGalleryImages.map((img) => (
                <div
                  key={img.id}
                  className="relative border border-gray-700 rounded-xl overflow-hidden bg-gray-800/70 hover:scale-[1.03] transition-all"
                >
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    className="w-full h-24 object-cover"
                  />
                  <button
                    onClick={() => removeNewGalleryImage(img.id)}
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-red-400 hover:text-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Layouts */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm text-white">Layouts</label>
              <button
                type="button"
                onClick={handleAddLayout}
                className="px-5 py-2  bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
              >
                Add Layout
              </button>
            </div>

            {[...layouts, ...newLayouts].map((l) => {
              const isNew = newLayouts.includes(l);
              return (
                <div
                  key={l.id}
                  className="border border-gray-700 rounded-xl p-6 bg-gray-800/70 hover:scale-[1.01] transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <label className="block text-sm mb-1 text-white">
                        Title
                      </label>
                      <select
                        value={l.title}
                        name="title"
                        onChange={
                          isNew
                            ? (e) => handleNewLayoutChange(l.id, e)
                            : (e) => handleLayoutChange(l._id, e)
                        }
                        className="w-full rounded-xl border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                      >
                        <option value="">Select</option>
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm  mb-1 text-white">
                        Area (sqft)
                      </label>
                      <input
                        type="number"
                        value={l.area}
                        name="area"
                        onChange={
                          isNew
                            ? (e) => handleNewLayoutChange(l.id, e)
                            : (e) => handleLayoutChange(l._id, e)
                        }
                        className="w-full rounded-xl border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm  mb-1 text-white">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={l.price}
                        name="price"
                        onChange={
                          isNew
                            ? (e) => handleNewLayoutChange(l.id, e)
                            : (e) => handleLayoutChange(l._id, e)
                        }
                        className="w-full rounded-xl border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-4 mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`layoutInput-${l.id}`}
                      onChange={
                        isNew
                          ? (e) => handleNewLayoutImageChange(l.id, e)
                          : (e) => handleLayoutImageChange(l._id, e)
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(`layoutInput-${l.id}`).click()
                      }
                      className="px-5 py-2 bg-white border rounded-md text-black  shadow-md hover:bg-black hover:text-white hover:border-white transition"
                    >
                      {isNew ? "Add / Change Image" : "Change Image"}
                    </button>

                    {l.imagePreview || l.image ? (
                      <div>
                        <img
                          src={
                            l.imagePreview ||
                            `${backendUrl}/${l.image}` ||
                            l.imagePath
                          }
                          alt="Layout"
                          className="w-40 h-40 object-cover rounded-xl border border-gray-600"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-40 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-600 rounded-lg">
                        No image
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={
                        isNew
                          ? () => removeNewLayout(l.id)
                          : () => removeLayout(l._id)
                      }
                      className="px-5 py-2 bg-red-500  border rounded-md text-black shadow-md hover:bg-black hover:text-white hover:border-white transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={discard}
              className="px-5 py-2 bg-red-500  border rounded-md text-black shadow-md hover:bg-black hover:text-white hover:border-white transition"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-yellow-200  border rounded-md text-black shadow-md hover:bg-black hover:text-white hover:border-white transition"
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

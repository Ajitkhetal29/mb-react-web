import React from "react";
import { useContext } from "react";
import { AppConetxt } from "../context/context";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllFaq = () => {
  const { allFaq, getAllFaq, deleteFaq, backendUrl } = useContext(AppConetxt);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [faqFormOpen, setFaqFormOpen] = useState(false);

  useEffect(() => {
    getAllFaq();
  }, []);

  const [updateForm, setUpdateForm] = useState({
    id:"",
    question: "",
    answer: "",
  });

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
  });
  const faqFormChange = (e) => {
    setFaqForm({ ...faqForm, [e.target.name]: e.target.value });
  };
  const updateFormChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleAddFaq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/faq/addfaq`,
        faqForm,
        {}
      );
      if (response.data.success) {
        toast.success("New FAQ Added", { autoClose: 2000 });
        getAllFaq();
        setFaqForm({ question: "", answer: "" });
      } else {
        console.log(response.data.message);
      }
      console.log("response", response);
    } catch (error) {}
  };

  const handleUpdateFaq = async (e) => {
    e.preventDefault();
    console.log("update form",updateForm);
    
    try {
      const response = await axios.put(
        `${backendUrl}/faq/updateFaq`,
        updateForm,
        {}
      );
      if (response.data.success) {
        toast.success("FAQ Updated", { autoClose: 2000 });
        getAllFaq();
        setEditingFaqId(null);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!allFaq) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-full p-4">
        <h2>All FAQ's</h2>

        <div>
          <div>
            <button onClick={() => setFaqFormOpen((prev) => !prev)}>
              + Add FAQ
            </button>
          </div>

          {faqFormOpen && (
            <div className="border p-4 mb-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Add New FAQ</h3>
              <div>
                <label>Question:</label>
                <input
                  type="text"
                  placeholder=""
                  name="question"
                  value={faqForm.question}
                  onChange={faqFormChange}
                />
                <label>Answer</label>
                <input
                  type="text"
                  placeholder=""
                  name="answer"
                  value={faqForm.answer}
                  onChange={faqFormChange}
                />
                <button type="button" onClick={(e) => handleAddFaq(e)}>
                  Add
                </button>
              </div>
            </div>
          )}

          {allFaq.map((faq) => (
            <div key={faq._id} className="border p-4 mb-4 rounded shadow">
              {faq._id === editingFaqId ? (
                <div>
                  <label>Question:</label>
                  <input
                    type="text"
                    placeholder=""
                    name="question"
                    value={updateForm.question}
                    onChange={updateFormChange}
                  />
                  <label>Answer</label>
                  <input
                    type="text"
                    placeholder=""
                    name="answer"
                    value={updateForm.answer}
                    onChange={updateFormChange}
                  />
                  <button onClick={() => setEditingFaqId()}>discard</button>
                  <button onClick={handleUpdateFaq} >Update</button>
                </div>
              ) : (
                <div>
                  <label htmlFor="">Question</label>
                  <p className="text-lg font-semibold mb-2">{faq.question}</p>
                  <label htmlFor="">Question</label>
                  <p className="mb-4">{faq.answer}</p>
                  <button
                    onClick={() => {
                        setEditingFaqId(faq._id);
                        setUpdateForm({ question: faq.question, answer: faq.answer, id: faq._id});
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteFaq(faq._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFaq;

import React, {  useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
const Register = () => {
  const [input, setInput] = useState({
    name: "",
    college: "",
    course: "",
    year: "",
    semester: "",
  });
  const [studentData, getStudentData] = useState([]);

  const handleInputChange = (e) => {
    console.log("input object is", e);
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log("input is", input);
  };

  const saveData = async (e) => {
    e.preventDefault();
    if (
      !input.name ||
      !input.college ||
      !input.course ||
      !input.year ||
      !input.semester
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "students"), input);
      console.log("Document written with ID: ", docRef.id);
      setInput({ name: "", college: "", course: "", year: "", semester: "" });
      fetchData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    Swal.fire({
      title: "Success!",
      text: "Student registered successfully",
      icon: "success",
      confirmButtonText: "OK"
    });
  };

 
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800 mb-6 sm:text-sm">
          Student Registration
        </h2>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="text"
            name="college"
            placeholder="College"
            value={input.college}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={input.course}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="number"
            placeholder="Year"
            name="year"
            value={input.year}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="number"
            placeholder="Semester"
            name="semester"
            value={input.semester}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            onClick={saveData}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Register
          </button>
        </form>
      </div>

    </>
  );
};

export default Register;

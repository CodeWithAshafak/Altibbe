import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";




const Update = () => {
  const [studentData, getStudentData] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    getStudentData(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  const deleteData = async (id) => {
    try {
      // alert(`${id}`)
      await deleteDoc(doc(db, "students", id));
      getStudentData(studentData.filter((student) => student.id !== id));

      fetchData();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };












const editData = async (id) => {
    const student = studentData.find((student) => student.id === id);
    if (!student) return;
    const { value: formValues } = await Swal.fire({
      title: "Edit Student",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${student.name}">
        <input id="swal-input2" class="swal2-input" placeholder="College" value="${student.college}">
        <input id="swal-input3" class="swal2-input" placeholder="Course" value="${student.course}">
        <input id="swal-input4" class="swal2-input" placeholder="Year" value="${student.year}">
        <input id="swal-input5" class="swal2-input" placeholder="Semester" value="${student.semester}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,
        ];
      },
    });

    if (formValues) {
      const [name, college, course, year, semester] = formValues;

      try {
        await updateDoc(doc(db, "students", id), {
          name,
          college,
          course,
          year,
          semester,
        });

        Swal.fire("Updated!", "Record has been updated.", "success");
        fetchData();
      } catch (error) {
        console.error("Error updating document: ", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };







  useEffect(() => {
    fetchData();
  }, []);
  let sr = 0;

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
        <h3 className="text-2xl mt-12 mb-4 uppercase text-center">
          Update Students Record
        </h3>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th>sr</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">College</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">Semester</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {studentData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No data found.
                  </td>
                </tr>
              ) : (
                studentData.map((student) => (
                  <tr key={student.id} className="text-center">
                    <td className="border px-4 py-2">{++sr}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.college}</td>
                    <td className="border px-4 py-2">{student.course}</td>
                    <td className="border px-4 py-2">{student.year}</td>
                    <td className="border px-4 py-2">{student.semester}</td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center items-center cursor-pointer">
                        <FaUserEdit size={25} onClick={() => editData(student.id)} />
                        
                      </div>
                    </td>
                    <td className="border px-4 py-2  cursor-pointer text-center items-center ">
                      <div className="flex justify-center items-center">
                        <MdOutlineDeleteForever
                          size={25}
                          onClick={() => deleteData(student.id)}
                          className="text-red-500 hover:text-red-700 items-center cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Update;

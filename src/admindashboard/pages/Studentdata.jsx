
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Studentdata = () => {
   const [studentData, getStudentData] = useState([]);

    const fetchData = async () => {
       const querySnapshot = await getDocs(collection(db, "students"));
       getStudentData(
         querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       );
     };
   
     useEffect(() => {
       fetchData();
     }, []);
      let sr = 0;
  return (
    <>
    
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
          <h3 className="text-2xl mt-12 mb-4">Registered Students</h3>
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
                    <tr key={student.id}>
                      <td className="border px-4 py-2">{++sr}</td>
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">{student.college}</td>
                      <td className="border px-4 py-2">{student.course}</td>
                      <td className="border px-4 py-2">{student.year}</td>
                      <td className="border px-4 py-2">{student.semester}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    
    </>
  )
}

export default Studentdata
import React, { useEffect, useState } from "react";
import "./Upload.css";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import Table from "../UserData/Table";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [Failed, setFailed] = useState([]);
  const navigate = useNavigate();

  const handleOnChange = async (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (csvFile === null) {
      toast.error("Please Select a File to Upload");
    } else {
      try {
        const formData = new FormData();
        formData.append("streamfile", csvFile);
        const res = await fetch("/upload", {
          method: "POST",
          body: formData,
        });
        const user = await res.json();
        setFailed(user.data);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        } else {
          if (user.data.length !== 0) {
            toast.error("Some Entries Failed");
          } else {
            toast.success("File Uploded Successfully");
          }

          setCsvFile(null);
        }
      } catch (err) {
        toast.error("Error in Uploading the file");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const Callmainpage = async () => {
      try {
        const res = await fetch("/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const user = await res.json();
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience");
        navigate("/login");
      }
    };
    Callmainpage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="upload">
      <Navbar />

      <div className="upload_area">
        <div className="uplodedfile_name">
          {csvFile && (
            <>
              {csvFile.name} - {csvFile.size} bytes
            </>
          )}
        </div>

        <form>
          <label htmlFor="file-upload" className="custom-file-upload">
            <div className="browse">
              <h3>Browse Files</h3>
            </div>
          </label>
          <input
            type="file"
            id="file-upload"
            name="streamfile"
            onChange={handleOnChange}
            required
            className="browse"
            accept=".csv"
          />
          <p>Only CSV Files Allowed</p>
        </form>
      </div>
      <button
        onClick={(e) => {
          handleOnSubmit(e);
        }}
        className="upload_btn"
      >
        Upload
      </button>
      {Failed.length !== 0 && (
        <div className="upload_Entries">
          <h1>Failed Entries</h1>
          <Table userData={Failed} />
        </div>
      )}
    </div>
  );
};

export default Upload;

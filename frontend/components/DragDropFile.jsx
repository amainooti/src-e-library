import { useRef, useState } from "react";

async function handleFile(files) {
  var pdf = files[0];
  var details = await pdfDetails(pdf);
  console.log(details);
  //   console.log(files);
  //   var fileName = files[0].name;
  //   var fileType = files[0].type;
  //   let fileSize = formatSizeUnits(files[0].size);

  //   console.log(fileName);
  //   console.log(fileType);
  //   console.log(fileSize);
  //   return fileName, fileType, fileSize;
}

function pdfDetails(pdfBlob) {
  return new Promise((done) => {
    var reader = new FileReader();
    reader.onload = function () {
      var raw = reader.result;

      var Pages = raw.match(/\Type[\s]*\/Page[^s]/g).length;

      var regex = /<xmp.*?:(.*?)>(.*?)</g;
      var meta = [
        {
          Pages,
        },
      ];
      var matches = regex.exec(raw);
      while (matches != null) {
        matches.shift();
        meta.push({
          [matches.shift()]: matches.shift(),
        });
        matches = regex.exec(raw);
      }
      done(meta);
    };
    reader.readAsBinaryString(pdfBlob);
  });
}

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}

// drag drop file component
function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          accept=".pdf,.epub"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </>
  );
}
export default DragDropFile;

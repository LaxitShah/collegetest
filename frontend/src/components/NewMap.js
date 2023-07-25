const NewMap = () => {
  return (
    <>
      <iframe
        style={{width:"100%",height:"590px"}}
        src="https://maps.google.com/maps?q=37.7749,-122.4194&hl=es&z=14&amp;output=embed"
      ></iframe>
      <br />
      <small>
        <a
          href="https://maps.google.com/maps?q=37.7749,-122.4194&hl=es&z=14&amp;output=embed"
          style={{ color: "#0000FF", textAlign: "left" }}
          target="_blank"
        >
          See map bigger
        </a>
      </small>
    </>
  );
};

export default NewMap;
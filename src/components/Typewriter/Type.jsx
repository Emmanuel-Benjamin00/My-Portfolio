import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: ["Software Developer", "Web Developer"],
        autoStart: true,
        loop: true,
        deleteSpeed: 170,
      }}
    />
  );
}

export default Type;

const WaveLabel = ({ text }) => {
  return (
    <span className="wave-label" aria-label={text}>
      {[...text].map((char, index) => (
        <span
          // CSS var drives stagger delay per character.
          key={`${char}-${index}`}
          className="wave-char"
          style={{ "--wave-index": index }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default WaveLabel;

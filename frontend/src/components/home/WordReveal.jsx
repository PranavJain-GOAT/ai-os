import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CustomTag = ({ tag, children, className, style }) => {
  const Tag = tag || "span";
  return <Tag className={className} style={style}>{children}</Tag>;
};

export default function WordReveal({ text, tag, className, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center center"] });
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(8px)", "blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <CustomTag tag={tag} className={className} style={style}>
      <motion.span ref={ref} style={{ filter, opacity, display: 'inline-block' }} transition={{ type: "spring", stiffness: 100 }}>
        {text}
      </motion.span>
    </CustomTag>
  );
}
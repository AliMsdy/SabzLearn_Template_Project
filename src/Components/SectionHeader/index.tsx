type SectionHeaderType = {
  title: string;
  desc?: string;
};
function SectionHeader({ title, desc }: SectionHeaderType) {
  return (
    <div className="relative after:absolute after:right-[-15px] after:top-[50%] after:h-[calc(100%-10px)] after:w-[0.35rem] after:translate-y-[-50%] after:rotate-[8deg] after:rounded-xl after:bg-primary-color">
      <p className="relative w-max text-3xl font-extrabold leading-relaxed text-[#444446] after:absolute after:bottom-[15%] after:right-0 after:h-2/6 after:w-full after:bg-green-500 after:bg-opacity-20">
        {title}
      </p>
      <p className="text-[#9c9c9c]">{desc}</p>
    </div>
  );
}

export { SectionHeader };

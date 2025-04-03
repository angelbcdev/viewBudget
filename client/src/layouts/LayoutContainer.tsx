const LayoutContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="w-full min-h-[634px] flex flex-col  items-centesr justify-center p-4">
      <div className="w-full h-full flex flex-col min-h-[580px] items-center justify-start pt-8 bg-white rounded-lg ">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default LayoutContainer;

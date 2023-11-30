import Breadcrumbs from "../Breadcrumbs";

export default function PageTitle({ title, breadcrumb = [] }) {
  return (
    <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
      <div className="container-x mx-auto">
        <div className="mb-5">
          <Breadcrumbs paths={breadcrumb} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-qblack">{title}</h1>
        </div>
      </div>
    </div>
  );
}

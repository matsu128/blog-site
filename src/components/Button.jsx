const Button = ({ text }) => {
  return (
    <button className="relative w-full mt-5 rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm overflow-hidden transition duration-300 transform hover:translate-y-[-0.2rem] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
      <span className="absolute inset-0 bg-orange-500 transform scale-0 origin-bottom"></span>
      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default Button;

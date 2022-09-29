const sort_by = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};

const college = [
  {
    title: "Medicine and Health Sciences",
    id: "medicine",
    department: [
      "Medicine, Bachelor of Surgery (MBBS)",
      "Nursing Sciences",
      "Medical Laboratory Science",
      "Dentistry",
      "Optometry",
      "Human Anatomy",
      "Human Physiology",
      "Human Nutrition & Dietetics",
      "Pharmacology & Therapeutics",
      "Public Health",
    ],
  },
  {
    title: "Pharmacy",
    id: "pharmacy",
    department: ["Pharmacy"],
  },
  {
    title: "Law",
    id: "law",
    department: ["Law"],
  },
  {
    title: "Engineering",
    id: "engineering",
    department: [
      "Mechanical",
      "Mechatronics",
      "Electrical/ Electronics",
      "Petroleum",
      "Civil",
      "Chemical",
      "Computer",
      "Biomedical",
      "Aeronautical and Astronautical",
    ],
  },
  {
    title: "Science",
    id: "science",
    department: [
      "Microbiology ",
      "Biotechnology ",
      "Biochemistry ",
      "Industrial Chemistry",
      "Computer Science",
      "Geology",
      "Architecture ",
    ],
  },
  {
    title: "Social and Management Sciences",
    id: "sms",
    department: [
      "Economics",
      "Accounting",
      "Banking & Finance",
      "Business Administration",
      "Tourism & Events Management",
      "Political Science",
      "International Relations & Diplomacy",
      "Conflict, Peace & Strategic Studies",
      "Intelligence & Security Studies",
      "Communication & Media Studies",
      "Sociology",
    ],
  },
  {
    title: "Agriculture",
    id: "agric",
    department: [
      "Animal Science",
      "Accounting",
      "Agricultural Economics",
      "Extension Education",
      "Crop Science",
      "Soil Science",
    ],
  },
  {
    title: "Arts and Humanities",
    id: "arts",
    department: ["Performing Arts"],
  },
];

export const colleges = college.sort(
  sort_by("title", false, (a) => a.toUpperCase())
);

export const getDepartment = (collegeName) => {
  for (const college of colleges) {
    if (college.title === collegeName) {
      return college.department.sort();
    }
  }
  return [];
};

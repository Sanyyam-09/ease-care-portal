import doctorMale1 from "@/assets/doctors/doctor-male-1.jpg";
import doctorFemale1 from "@/assets/doctors/doctor-female-1.jpg";
import doctorMale2 from "@/assets/doctors/doctor-male-2.jpg";
import doctorFemale2 from "@/assets/doctors/doctor-female-2.jpg";

const maleAvatars = [doctorMale1, doctorMale2];
const femaleAvatars = [doctorFemale1, doctorFemale2];
const allAvatars = [...maleAvatars, ...femaleAvatars];

export const getDoctorAvatar = (name: string, index: number): string => {
  // Simple heuristic: use name to pick a consistent avatar
  const femaleIndicators = ["priya", "anita", "meera", "sunita", "kavita", "deepa", "neha", "pooja", "sita", "rekha", "anjali", "swati", "ritu", "divya", "nisha"];
  const isLikelyFemale = femaleIndicators.some(f => name.toLowerCase().includes(f));

  if (isLikelyFemale) {
    return femaleAvatars[index % femaleAvatars.length];
  }
  return maleAvatars[index % maleAvatars.length];
};

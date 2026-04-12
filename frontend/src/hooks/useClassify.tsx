// frontend/src/hooks/useClassify.ts

interface FormDataProps {
  roomNumber: number;
  name: string;
  emergencyType: string;
  description: string;
}

const useClassify = () => {
  const classifyIncident = async (formData: FormDataProps) => {
    try {
      const response = await fetch("http://localhost:3000/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("response status", response.status);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log("fetch error", error);
      throw error;
    }
  };

  return { classifyIncident };
};

export default useClassify;

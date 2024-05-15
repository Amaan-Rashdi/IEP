const backendURL = 'http://124.29.197.77:8092';

export const fetchData = async ({ termId, studentId }) => {
  try {
    console.log("in student api");
    const response = await fetch(
      `${backendURL}/api/Students/StudentResultFetch?StudentId=${studentId}&TermId=${termId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.log("maroof")
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log("student dashboard", JSON.stringify(data));
    localStorage.setItem("student", JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
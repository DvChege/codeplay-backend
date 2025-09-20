import axios from "axios";

export async function runCodeWithJudge0({ code, language_id, test_cases }) {
  try {
    const results = [];
    for (let tc of test_cases) {
      const res = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
        {
          source_code: code,
          language_id,
          stdin: tc.input,
          expected_output: tc.output
        },
        {
          headers: {
            "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
            "Content-Type": "application/json"
          }
        }
      );
      results.push(res.data.status.id === 3); // status 3 = Accepted
    }
    const passed = results.every(Boolean);
    return { passed, results };
  } catch (err) {
    return { passed: false, error: err.message };
  }
}
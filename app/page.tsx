"use client";
import { useState } from "react";

const FUNCTION_ENDPOINT = process.env.NEXT_PUBLIC_FUNCTION_ENDPOINT

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [searchResponse, setSearchResponse] = useState({
    value: "",
    isLoading: false,
  });

  const submitSearch = async () => {
    setSearchResponse({
      value: "",
      isLoading: true,
    });

    try {
      const request = await fetch(`${FUNCTION_ENDPOINT}/smartquestionsanswer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ question: searchText }),
      });

      const response = await request.json();

      setSearchResponse({
        value: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);

      setSearchResponse({
        value: "",
        isLoading: false,
      });
    }
  };

  return (
    <div>
      <div className="bg-gray-200 h-96 s w-full flex items-center">
        <div className="w-full">
          <div></div>
          <h1 className="text-center text-2xl font-semibold">
            Azure Intelligent Document Search{" "}
          </h1>
          <p className="text-center">
            Ask a question to get an answer from an indexed document using OpenAI's intelligent document feature. 
          </p>

          <p className="text-center" >
            Using the {" "}
            <a className="text-[blue]" href="https://victoryaistorageaccount.blob.core.windows.net/fileupload-files/How_to_Drive_a_Car_with_Pictures_wikiHow.pdf?sp=r&st=2024-10-22T16:07:06Z&se=2026-12-01T01:07:06Z&sv=2022-11-02&sr=b&sig=eeVoxRq%2FU5xZmXA6WssPbG4NhsK%2BqExmn9zb2xpim%2Bs%3D">
              How_to_Drive_a_Car_with_Pictures_wikiHow.pdf
            </a> {" "}
            document
          </p>

          <div className="flex mt-6 flex-row justify-center">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="text-sm py-1 px-4 w-[350px]"
              placeholder="What do you want to search for?"
            />

            <div className="ml-4 flex items-center">
              <button
                onClick={submitSearch}
                type="button"
                disabled={!searchText || searchResponse.isLoading}
                className="text-white bg-blue-700 disabled:bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              >
                {searchResponse.isLoading
                  ? "Getting Response"
                  : "Submit Search"}
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm text-center text-gray-500 mt-2">
              E.g: How to put vehicle in reverse?
            </p>
          </div>
        </div>
      </div>

      {searchResponse.value && (
        <div className="max-w-[750px] m-auto mt-12">
          <p className="text-lg font-semibold">Here's my answer:</p>

          <p>{searchResponse.value}</p>
        </div>
      )}
    </div>
  );
}

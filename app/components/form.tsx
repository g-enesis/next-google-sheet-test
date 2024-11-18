"use client";

import { FormEvent, useState } from "react";

/**
 * 구글 시트 테스트 폼
 */
const FlowForm = () => {
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const onChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = {
      title: state.title,
      content: state.content,
    };

    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("전송에 실패하였습니다.");
      }

      setState({ title: "", content: "" });
    } catch (e) {
      throw e;
    }
  };

  return (
    <div>
      <form action="" className="py-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <label htmlFor="title" className="sr-only">
            제목
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={state.title}
            onChange={onChageInput}
            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-52 h-12 px-3 py-2 rounded-md border-gray-300 placeholder:text-gray-500 placeholder:text-sm"
            placeholder="제목"
          />
        </div>

        <div className="flex items-center justify-center">
          <label htmlFor="content" className="sr-only">
            내용
          </label>
          <input
            type="text"
            name="content"
            id="content"
            value={state.content}
            onChange={onChageInput}
            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-52 h-12 px-3 py-2 rounded-md border-gray-300 placeholder:text-gray-500 placeholder:text-sm"
            placeholder="내용"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="flex items-center justify-center text-sm w-52 rounded-md shadow py-3 px-2 text-white bg-indigo-500"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlowForm;

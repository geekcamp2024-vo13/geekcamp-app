"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCommunity } from "@/service/supabase/updates/createCommunity";
import { toast, Toaster } from "react-hot-toast";

const CreateCommunity = () => {
    const [communityName, setCommunityName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [memberLimits, setMemberLimits] = useState<number>(5);
    const [nickname, setNickname] = useState<string>("");

    const router = useRouter();

    const handleCreate = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            const isSuccess = await createCommunity(
                communityName,
                description,
                new Date(startDate),
                memberLimits,
                nickname
            );
            if (isSuccess) {
                toast.success("コミュニティを作成しました");
                router.push("/communities");
            }
        } catch (error) {
            alert("予期しないエラー");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-3xl font-bold mb-6 text-center">
                コミュニティ新規作成
            </h1>

            <form onSubmit={handleCreate} className="space-y-4">
                <input
                    id="communityName"
                    type="text"
                    placeholder="コミュニティ名"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    id="description"
                    rows={7}
                    placeholder="コミュニティの説明"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

                <input
                    id="nickname"
                    type="text"
                    placeholder="個人が特定されないニックネーム"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    id="memberLimits"
                    type="number"
                    placeholder="メンバー上限人数"
                    value={memberLimits}
                    onChange={(e) => setMemberLimits(Number(e.target.value))}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-col">
                    <label
                        htmlFor="startDate"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        開始日
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    作成
                </button>
            </form>

            <div className="mt-6 text-center">
                <Link
                    href="/"
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                    ホームへ
                </Link>
            </div>
        </div>
    );
};

export default CreateCommunity;

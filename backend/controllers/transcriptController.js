import Transcript from "../models/Transcript.js";
export const addTranscript = async (req, res) => {
    try {
        const { subjects, email } = req.body;
        // Kiểm tra dữ liệu đầu vào
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: "Invalid input data: 'subjects' is required and cannot be empty." });
        }
        // Kiểm tra từng subject trong mảng
        for (const subject of subjects) {
            if (!subject.subject || typeof subject.subject !== "string") {
                return res.status(400).json({ message: "Each subject must have a valid 'subject' name." });
            }
            if (!Array.isArray(subject.scores) || subject.scores.length === 0) {
                return res
                    .status(400)
                    .json({ message: `Subject '${subject.subject}' must have a non-empty 'scores' array.` });
            }
            for (const scoreEntry of subject.scores) {
                if (!scoreEntry.year || typeof scoreEntry.year !== "string") {
                    return res.status(400).json({ message: "Each score entry must have a valid 'year'." });
                }
                if (!scoreEntry.semester || typeof scoreEntry.semester !== "string") {
                    return res.status(400).json({ message: "Each score entry must have a valid 'semester'." });
                }
                if (typeof scoreEntry.score !== "number" || scoreEntry.score < 0 || scoreEntry.score > 10) {
                    return res.status(400).json({
                        message: "Each score entry must have a valid 'score' between 0 and 10.",
                    });
                }
            }
        }
        // Tạo bản ghi Transcript mới
        const newTranscript = new Transcript({ subjects, email, status: "waiting" });
        // Lưu vào cơ sở dữ liệu
        await newTranscript.save();

        res.status(201).json({ message: "Transcript created successfully", data: newTranscript });
    } catch (error) {
        console.error("Error adding transcript:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateTranscript = async (req, res) => {
    try {
        const { subjects, email, status } = req.body;

        // Kiểm tra dữ liệu đầu vào

        if (subjects && (!Array.isArray(subjects) || subjects.length === 0)) {
            return res.status(400).json({ message: "Invalid input data: 'subjects' must be a non-empty array." });
        }

        // Nếu có subjects, kiểm tra tính hợp lệ từng subject
        if (subjects) {
            for (const subject of subjects) {
                if (!Array.isArray(subject.scores) || subject.scores.length === 0) {
                    return res
                        .status(400)
                        .json({ message: `Subject '${subject.subject}' must have a non-empty 'scores' array.` });
                }
                for (const scoreEntry of subject.scores) {
                    if (!scoreEntry.year || typeof scoreEntry.year !== "string") {
                        return res.status(400).json({ message: "Each score entry must have a valid 'year'." });
                    }
                    if (!scoreEntry.semester || typeof scoreEntry.semester !== "string") {
                        return res.status(400).json({ message: "Each score entry must have a valid 'semester'." });
                    }
                    if (typeof scoreEntry.score !== "number" || scoreEntry.score < 0 || scoreEntry.score > 10) {
                        return res.status(400).json({
                            message: "Each score entry must have a valid 'score' between 0 and 10.",
                        });
                    }
                }
            }
        }

        // Tìm học bạ trong cơ sở dữ liệu
        const transcript = await Transcript.findOne({ email });

        if (!transcript) {
            return res.status(404).json({ message: "Transcript not found for the provided email." });
        }

        // Cập nhật dữ liệu
        if (subjects) transcript.subjects = subjects;
        if (status && typeof status === "string") transcript.status = status;

        // Lưu thay đổi vào cơ sở dữ liệu
        await transcript.save();

        res.status(200).json({ message: "Transcript updated successfully", data: transcript });
    } catch (error) {
        console.error("Error updating transcript:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getAllTranscripts = async (req, res) => {
    try {
        const transcript = await Transcript.find();
        if (!transcript.length) {
            return res.status(404).json({ message: "No learning process found" });
        }
        res.status(200).json({ message: "Success", data: transcript });
    } catch (error) {
        console.error("Error fetching transcripts:", error);
        res.status(500).json({ message: error.message });
    }
};

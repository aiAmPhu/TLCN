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
        const newTranscript = new Transcript({ subjects, email, status: "waiting", feedback: "" });
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
        if (subjects) {
            transcript.subjects = subjects;
            transcript.status = "waiting";
            transcript.feedback = "";
        }

        // Lưu thay đổi vào cơ sở dữ liệu
        await transcript.save();

        res.status(200).json({ message: "Transcript updated successfully", data: transcript });
    } catch (error) {
        console.error("Error updating transcript:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const acceptTranscript = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "accepted";
        updatedData.feedback = "";
        // Cập nhật tài liệu theo id
        const updatedAdInfomation = await Transcript.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );

        if (!updatedAdInfomation) {
            return res.status(400).json({ message: "AdInfomation not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedAdInfomation });
    } catch (error) {
        console.error("Error updating admission infomation:", error);
        res.status(500).json({ message: error.message });
    }
};
export const rejectTranscript = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "rejected"; // Cập nhật tài liệu theo id
        updatedData.feedback = updatedData.rejectionReason;

        const updatedAdInfomation = await Transcript.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );

        if (!updatedAdInfomation) {
            return res.status(400).json({ message: "AdInfomation not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedAdInfomation });
    } catch (error) {
        console.error("Error updating admission infomation:", error);
        res.status(500).json({ message: error.message });
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
export const getTranscriptByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ URL

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Tìm tài liệu trong cơ sở dữ liệu dựa trên email
        const transcript = await Transcript.findOne({ email });

        if (!transcript) {
            return res.status(404).json({ message: `No transcript found for email: ${email}` });
        }

        // Trả về dữ liệu tìm được
        res.status(200).json({ message: "Success", data: transcript });
    } catch (error) {
        console.error("Error fetching transcript by email:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getTranscriptStatusByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm kiếm tài liệu theo email và chỉ lấy trường 'status'
        const transcriptStatus = await Transcript.find({ email }).select("status feedback");

        // Kiểm tra nếu không có dữ liệu
        if (!transcriptStatus.length) {
            return res.status(404).json({ message: `No learning process found for email: ${email}` });
        }

        // Trả về dữ liệu status của học bạ tương ứng với email
        res.status(200).json({ message: "Success", data: transcriptStatus });
    } catch (error) {
        console.error("Error fetching learning process status by email:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getAverageScoreByEmailAndSubject = async (req, res) => {
    const { email, subject } = req.params; // Nhận email và môn học từ URL
    try {
        // Tìm các bảng điểm của người dùng dựa trên email
        const transcript = await Transcript.findOne({ email });

        // Kiểm tra xem bảng điểm có tồn tại không
        if (!transcript) {
            return res.status(400).json({ message: "Transcript not found for the given email" });
        }

        // Tìm môn học trong bảng điểm
        const subjectData = transcript.subjects.find((score) => score.subject === subject);

        // Nếu môn học không được tìm thấy
        if (!subjectData) {
            return res.status(400).json({ message: `Subject '${subject}' not found in the transcript` });
        }

        // Trả về điểm trung bình của môn học
        res.status(200).json({
            message: "Success",
            data: {
                subject: subjectData.subject,
                averageScore: subjectData.averageScore,
            },
        });
    } catch (error) {
        console.error("Error fetching average score:", error);
        res.status(500).json({ message: error.message });
    }
};

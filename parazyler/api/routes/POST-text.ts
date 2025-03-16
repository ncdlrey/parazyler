import { RouteHandler } from "gadget-server";
import { MultipartFile } from "@fastify/multipart";
import { pipeline } from "stream/promises";

const whisperRoute: RouteHandler = async ({ request, reply, api, logger, connections, config }) => {
  try {
    // Get the uploaded file
    const data = await request.file();
    
    if (!data) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    // Read file into buffer
    const chunks: Buffer[] = [];
    for await (const chunk of data.file) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);
    console.log("File received:", data.filename, "Size:", audioBuffer.length);

    // Import Hugging Face inference client dynamically
    const pkg = await import("@huggingface/inference");

    // Set up the API key for Hugging Face Inference
    const apiKey = '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'; // You should replace this with your own API key

    const client = new pkg.InferenceClient(apiKey);

    // Make the inference API call for ASR (Automatic Speech Recognition)
    const output = await client.automaticSpeechRecognition({
      data: audioBuffer,
      model: "openai/whisper-large-v3-turbo", // Specify the correct model you want to use
      provider: "hf-inference",
    });

    console.log("Transcription:", output.text);

    // Return the transcription
    return reply.status(200).send({ transcription: output.text });
  } catch (error) {
    logger.error("Error during transcription:", error);
    
    // Handle possible multipart or general errors
    if (error === "FST_MULTIPART_ERROR") {
      return reply.status(400).send({ error: "Invalid multipart request" });
    }

    return reply.status(500).send({ error: "Error processing transcription" });
  }
};

export default whisperRoute;

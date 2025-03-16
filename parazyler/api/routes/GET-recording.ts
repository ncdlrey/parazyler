import { RouteHandler } from "gadget-server";
import { MultipartFile } from "@fastify/multipart";
import { pipeline } from "stream/promises";

const route: RouteHandler = async ({ request, reply, api, logger, connections }) => {
  try {
    let transcription = "";

    // This function handles the recording and transcription
    const handleStartRecording = async (): Promise<string> => {
      return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks: Blob[] = [];

            mediaRecorder.ondataavailable = event => {
              audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
              const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType });
              const formData = new FormData();
              formData.append('audio', audioBlob);

              fetch('/text', {  // Assuming your '/text' route handles transcription
                method: 'POST',
                body: formData,
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to transcribe audio');
                }
                return response.json();
              })
              .then(data => {
                console.log('Transcription:', data.transcription);
                resolve(data.transcription);  // Resolve with transcription
              })
              .catch(error => {
                console.error('Error:', error);
                reject('Error transcribing audio');
              });
            };

            mediaRecorder.start();

            // Stop recording after 5 seconds
            setTimeout(() => {
              mediaRecorder.stop();
            }, 5000);
          })
          .catch(error => {
            console.error('Error accessing microphone:', error);
            reject('Error accessing microphone');
          });
      });
    };

    // Call the handleStartRecording function and await the transcription result
    transcription = await handleStartRecording();

    // Once transcription is ready, send it back in the response
    reply.status(200).send({ transcription });
  } catch (error) {
    logger.error('Internal Server Error:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export default route;

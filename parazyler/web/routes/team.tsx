import { api } from "../api";
import backgroundImage from "@/components/background_hmpg2.png";
import { Link } from "react-router";
import blank from "@/components/blank.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Nav from "@/components/navbar";

export default function () {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen w-full relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Nav/>
      <div className="container mx-auto px-4 pt-8 md:pt-12">
        <h1 className="text-center font-semibold text-white text-xl md:text-2xl lg:text-3xl tracking-wide mb-8 md:mb-12">OUR TEAM</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-6 md:px-12 lg:px-24 pt-10 md:pt-16 lg:pt-20">
        <Card className="w-full hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-center p-2 sm:p-3">
            <img src={blank} className="h-12 sm:h-16 w-12 sm:w-16 mx-auto sm:m-2 rounded-full"></img>
            <CardHeader className="p-2 sm:p-4">
              <CardTitle className="text-base sm:text-lg text-center sm:text-left">Ariz Kazani</CardTitle>
              <CardDescription className="text-sm text-center sm:text-left">Embedded Software/Hardware/VIM Demon</CardDescription>
            </CardHeader>
          </div>
        </Card>
        <Card className="w-full hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-center p-2 sm:p-3">
            <img src={blank} className="h-12 sm:h-16 w-12 sm:w-16 mx-auto sm:m-2 rounded-full"></img>
            <CardHeader className="p-2 sm:p-4">
              <CardTitle className="text-base sm:text-lg text-center sm:text-left">Sanil Sristava</CardTitle>
              <CardDescription className="text-sm text-center sm:text-left">Embedded Software/Hardware Demon</CardDescription>
            </CardHeader>
          </div>
        </Card>
        <Card className="w-full hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-center p-2 sm:p-3">
            <img src={blank} className="h-12 sm:h-16 w-12 sm:w-16 mx-auto sm:m-2 rounded-full"></img>
            <CardHeader className="p-2 sm:p-4">
              <CardTitle className="text-base sm:text-lg text-center sm:text-left">Nicole Delos Reyes</CardTitle>
              <CardDescription className="text-sm text-center sm:text-left">Front-end demon/UI&UX</CardDescription>
            </CardHeader>
          </div>
        </Card>
        <Card className="w-full hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-center p-2 sm:p-3">
            <img src={blank} className="h-12 sm:h-16 w-12 sm:w-16 mx-auto sm:m-2 rounded-full"></img>
            <CardHeader className="p-2 sm:p-4">
              <CardTitle className="text-base sm:text-lg text-center sm:text-left">Kishan Rajagunathas</CardTitle>
              <CardDescription className="text-sm text-center sm:text-left">Back Bender</CardDescription>
            </CardHeader>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
}

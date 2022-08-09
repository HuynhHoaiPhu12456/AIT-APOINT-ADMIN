import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ait-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  options = [
    { value: "Other", label: "Other", checked: true },
    { value: "Female", label: "Female", checked: false },
    { value: "Male", label: "Male", checked: false },
  ];
  option: { value: string; label: string };
  constructor() {}

  ngOnInit(): void {}
}

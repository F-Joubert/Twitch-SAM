"use server";

import SamJs from "sam-js";

export async function authenticateApp(formData: FormData) {
    return
}

// export async function speakSAM(formData: FormData) {
//     const rawFormData = {
//         inputSpeed: Number(formData.get("speed")),
//         inputPitch: Number(formData.get("pitch")),
//         inputMouth: Number(formData.get("mouth")),
//         inputThroat: Number(formData.get("throat")),
//     };

//     const sam = new SamJs({
//         speed: rawFormData.inputSpeed,
//         pitch: rawFormData.inputPitch,
//         mouth: rawFormData.inputMouth,
//         throat: rawFormData.inputThroat});

//     sam.speak("Hello");

//     console.log(rawFormData);
//     console.log("Test");
// }

/*
const opts = {debug: 1, pitch: 64, speed: 72, mouth: 128, throat: 128};
const presets = {
  sam:               {speed: 72, pitch: 64, throat: 128, mouth: 128},
  elf:               {speed: 72, pitch: 64, throat: 110, mouth: 160},
  little_robot:      {speed: 92, pitch: 60, throat: 190, mouth: 190},
  stuffy_guy:        {speed: 82, pitch: 72, throat: 110, mouth: 105},
  little_old_lady:   {speed: 82, pitch: 32, throat: 145, mouth: 145},
  extra_terrestrial: {speed: 100, pitch: 64, throat: 150, mouth: 200},
};

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('speechinput');
  const controls = {};

  const setOpt = (name, value) => {
    opts[name] = value;
    controls[name].value = value;
    document.getElementById(name + '-lbl').innerText = name.charAt(0).toUpperCase() + name.substring(1) + ': ' + value;
  };
  ['speed', 'pitch', 'mouth', 'throat'].forEach(
    (name) => {
      const e = document.getElementById(name);
      controls[name] = e;
      e.onchange = function (e) {
        setOpt(e.target.id, e.target.value);

      };
      e.value = opts[name];
    }
  );
  const selectPreset = (name) => {
    const values = presets[name];
    ['speed', 'pitch', 'mouth', 'throat'].forEach((name) => {
      setOpt(name, values[name]);
    });
  };
  selectPreset('sam');
  Object.keys(presets).forEach((preset) => {
    document.getElementById('preset_' + preset).addEventListener('click', () => selectPreset(preset));
  });

  let speech;
  document.getElementById('say').addEventListener('click', function (e) {
    e.preventDefault();
    if (speech) {
      speech.abort();
    }
    speech = (new SamJs(opts)).speak(input.value);
    speech.catch(() => {});
  });
  document.getElementById('download').addEventListener('click', function (e) {
    e.preventDefault();
    (new SamJs(opts)).download(input.value);
  });
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start').addEventListener('click', () => {
      var s = new SamJs();
      s.speak('Hello my name is SAM.').then(() => {
        s.speak('I will sing the national anthem of the united states of America.').then(() => {
          s.speak('The star spangled banner!').then(() => {
            delete s;
            sing();
          });
        });
      });
    })
  });

  var lines=[
    {speed: 40, pitch: 64, text: 'ohohoh'},
    {speed: 40, pitch: 76, text: 'ohohoh'},
    {speed: 40, pitch: 96, text: 'sehehehehehehehehehey'},
    {speed: 40, pitch: 76, text: 'kaeaeaeaeaeaeaeaeaen'},
    {speed: 40, pitch: 64, text: 'yuxuxuxuxuxuxw'},
    {speed: 40, pitch: 48, text: 'siyiyiyiyiyiyiyiyiyiyiyiyiyiyiyiyiyiy'},
    {speed: 40, pitch: 38, text: 'baaaaay'},
    {speed: 40, pitch: 42, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 48, text: 'daoaoaoaoaoaoaonz'},
    {speed: 40, pitch: 76, text: 'ererererererer'},
    {speed: 40, pitch: 68, text: 'liyiyiyiyiyiyiyiyiy'},
    {speed: 40, pitch: 64, text: 'laaaaaaaaaaaaaaaaaaaaaaaaayt'},
    {speed: 40, pitch: 64, text: 'whahahaht'},
    {speed: 40, pitch: 64, text: 'sohohuw'},
    {speed: 40, pitch: 38, text: 'praaaaaaaaaaaaaaaauwd'},
    {speed: 40, pitch: 42, text: 'liyiyiy'},
    {speed: 40, pitch: 48, text: 'wiyiyiyiyiyiyiyiyiy'},
    {speed: 40, pitch: 51, text: '/heheheheheheheheheheheheheheheheheheyld'},
    {speed: 40, pitch: 56, text: 'aeaeaeaet'},
    {speed: 40, pitch: 51, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 48, text: 'twaaaaaaaaaaaaaaiy'},
    {speed: 40, pitch: 48, text: 'laaaaaaaaaaaaiyts'},
    {speed: 40, pitch: 64, text: 'laeaeaeaeaeaeaeaeaest'},
    {speed: 40, pitch: 76, text: 'gliyiyiyiyiyiyiyiyiym'},
    {speed: 40, pitch: 96, text: 'mihihihihihihihihihihnx'},
    {speed: 40, pitch: 64, text: '/huxuxuxuxuxuxuxuxuxuxwz'},
    {speed: 40, pitch: 76, text: 'braoaoaod'},
    {speed: 40, pitch: 96, text: 'straaaaaaaaaaaaiyps'},
    {speed: 40, pitch: 76, text: 'aeaeaeaeaeaeaeaeaeaend'},
    {speed: 40, pitch: 64, text: 'braaaaaaaaaaaaaaiyt'},
    {speed: 40, pitch: 48, text: 'staaaaaaaaaaaaaaaaaaaaaaaaaarz'},
    {speed: 40, pitch: 38, text: 'thruxuxw'},
    {speed: 40, pitch: 42, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 48, text: 'pehehehehehehehehehehr'},
    {speed: 40, pitch: 76, text: 'rixixixixixixixixixixixixl'},
    {speed: 40, pitch: 68, text: 'lahahahahahahahahahs'},
    {speed: 40, pitch: 64, text: 'faaaaaaaaaaaaaaaaaaaaaaaaaaiyt'},
    {speed: 40, pitch: 64, text: 'ohohohr'},
    {speed: 40, pitch: 64, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 38, text: 'raeaeaeaeaeaeaeaeaeaeaeaem'},
    {speed: 40, pitch: 42, text: 'paaaarts'},
    {speed: 40, pitch: 48, text: 'wiyiyiyiyiyiyiyiyiy'},
    {speed: 40, pitch: 51, text: 'waaaaaaaaaaaaaaaaaaaaaaaaaachd'},
    {speed: 40, pitch: 56, text: 'werer'},
    {speed: 40, pitch: 51, text: 'sohohw'},
    {speed: 40, pitch: 48, text: 'gaeaeaeaeaeaeaeaeaeael'},
    {speed: 40, pitch: 48, text: 'lixixixixixixixixixixixixixnt'},
    {speed: 40, pitch: 64, text: 'liyiyiyiyiyiyiyiyiy'},
    {speed: 40, pitch: 76, text: 'striyiyiyiyiyiyiyiyiym'},
    {speed: 40, pitch: 96, text: 'mihihihihihihihihihnx'},
    {speed: 40, pitch: 38, text: 'aeaeaeaeaend'},
    {speed: 40, pitch: 38, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 38, text: 'raaaaaaaaaaaak'},
    {speed: 40, pitch: 36, text: 'kixixixixixixixixixixixts'},
    {speed: 40, pitch: 32, text: 'rehehehehehehehehehd'},
    {speed: 40, pitch: 32, text: 'gleheheheheheheheheheheheheheheherer'},
    {speed: 40, pitch: 36, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 38, text: 'baaaamz'},
    {speed: 40, pitch: 42, text: 'bererererererst'},
    {speed: 40, pitch: 38, text: 'tihihihihihihihihihnx'},
    {speed: 40, pitch: 36, text: 'ihihihihihihihihihihn'},
    {speed: 40, pitch: 36, text: 'eheheheheheheheheheheheheheheheheheyr'},
    {speed: 40, pitch: 36, text: 'geheheheyv'},
    {speed: 40, pitch: 38, text: 'pruxuxuxuxuxuxuxuxuxuxuxuxwf'},
    {speed: 40, pitch: 42, text: 'thruxuxw'},
    {speed: 40, pitch: 48, text: 'dhaaaxaxax'},
    {speed: 40, pitch: 51, text: 'naaaaaaaaaaaaaaaaaaaaaaayiyt'},
    {speed: 40, pitch: 56, text: 'dhaeaeaeaet'},
    {speed: 40, pitch: 51, text: 'aaaaaauwr'},
    {speed: 40, pitch: 48, text: 'flaeaeaeaeaeaeaeaeaeg'},
    {speed: 40, pitch: 76, text: 'wahahahahahahahahahz'},
    {speed: 40, pitch: 68, text: 'stihihihihihihihihihl'},
    {speed: 40, pitch: 64, text: 'dhehehehehehehehehehehehehehehehehehehehr'},
    {speed: 40, pitch: 64, text: 'ohohohohohohow'},
    {speed: 40, pitch: 48, text: 'sehehehehehehehehehey'},
    {speed: 40, pitch: 48, text: 'dahahahahahahahahahz'},
    {speed: 40, pitch: 48, text: 'dhaeaeae'},
    {speed: 40, pitch: 51, text: 'aeaeaet'},
    {speed: 40, pitch: 56, text: 'staaaaaaaaaaaar'},
    {speed: 40, pitch: 56, text: 'spehehehehehehehehehiynx'},
    {speed: 40, pitch: 56, text: 'gaxaxaxaxaxaxaxaxaxaxaxaxld'},
    {speed: 40, pitch: 42, text: 'baeaeaeaeaeaeaeaeaen'},
    {speed: 40, pitch: 36, text: 'nerer'},
    {speed: 40, pitch: 38, text: 'ererer'},
    {speed: 40, pitch: 42, text: 'yeheheh'},
    {speed: 40, pitch: 48, text: 'eheheheht'},
    {speed: 40, pitch: 48, text: 'weheheheheheheheheheheh'},
    {speed: 40, pitch: 51, text: 'ehehehehehehehiyiyiyv'},
    {speed: 40, pitch: 64, text: 'ohohohr'},
    {speed: 40, pitch: 64, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 48, text: 'laeaeaeaeaeaeaeaeaeaeaeae'},
    {speed: 40, pitch: 42, text: 'aeaeaend'},
    {speed: 40, pitch: 38, text: 'ahahahv'},
    {speed: 40, pitch: 36, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 32, text: 'friyiyiyiyiyiyiyiyiyiyiyiyiyiyiyiyiyiy'},
    {speed: 40, pitch: 48, text: 'aeaeaend'},
    {speed: 40, pitch: 42, text: 'dhaaaxaxaxax'},
    {speed: 40, pitch: 38, text: '/hohohohohohohohohowm'},
    {speed: 40, pitch: 36, text: 'ahahahahv'},
    {speed: 40, pitch: 42, text: 'dhaaaxaxaxaxaxaxaxaxaxaxaxaxax'},
    {speed: 40, pitch: 48, text: 'brehehehehehehehehehehiyiyiyv'}
  ];
  var line = 0;
  function sing () {
    if (line===lines.length) {
      return;
    }
    var chunk = lines[line++];
    var s = new SamJs({speed: chunk.speed, pitch: chunk.pitch, singmode: true});
    s.speak(chunk.text, true).then(sing);
  }
*/
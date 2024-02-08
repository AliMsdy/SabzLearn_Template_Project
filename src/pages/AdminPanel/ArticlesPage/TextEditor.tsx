//styles
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
//plugins
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/table.min.js";

//language
import "froala-editor/js/languages/fa.js";

//mainComponent
import FroalaTextEditor from "react-froala-wysiwyg";

//type
import { AddNewArticleInputTypes, SetState } from "@/types/shared";
import { UseFormReturn } from "react-hook-form";

type TextEditorProps = {
  model: string;
  setModel: SetState<string>;
  methods: UseFormReturn<AddNewArticleInputTypes, any, undefined>;
};

const changeDirection: (
  this: FroalaEditor,
  dir: string,
  align: string,
) => void = function (dir: string, align: string) {
  // Wrap block tags.
  this.selection.save();
  this.html.wrap(true, true, true);
  this.selection.restore();

  // Get blocks.
  const elements = this.selection.blocks();

  // Save selection to restore it later.
  this.selection.save();

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element != this.el) {
      this.$(element)
        .css("direction", dir)
        .css("text-align", align)
        .removeClass("fr-temp-div");
    }
  }

  // Unwrap temp divs.
  this.html.unwrap();

  // Restore selection.
  this.selection.restore();
};

//customButtonAddedToEditor(with custom functionality)

import FroalaEditor from "froala-editor";
FroalaEditor.DefineIcon("clear", { NAME: "remove", SVG_KEY: "remove" });
FroalaEditor.RegisterCommand("clear", {
  title: "حذف محتوای ادیتور",
  focus: false,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.set("");
    this.events.focus();
  },
});

FroalaEditor.DefineIcon("rightToLeft", {
  NAME: "arrow-left",
  template: "font_awesome",
});
FroalaEditor.RegisterCommand("rightToLeft", {
  title: "RTL",
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    changeDirection.apply(this, ["rtl", "right"]);
  },
});

FroalaEditor.DefineIcon("leftToRight", {
  NAME: "arrow-right",
  template: "font_awesome",
});
FroalaEditor.RegisterCommand("leftToRight", {
  title: "LTR",
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    changeDirection.apply(this, ["ltr", "left"]);
  },
});

function TextEditor({ model, setModel, methods }: TextEditorProps) {
  return (
    <div id="editor" className="blog-content font-vazir">
      <FroalaTextEditor
        config={{
          placeholderText: "متن مقاله خود را وارد کنید...",
          language: "fa",
          direction: "rtl",
          heightMin: 200,
          heightMax: 600,
          fontFamily: {
            lalehzar: "Lalehzar",
            vazir: "Vazir",
            IRANSans: "IranSanse",
          },
          fontFamilyDefaultSelection: "sans-serif",
          fontFamilySelection: true,
          fontSizeSelection: true,
          paragraphFormat: {
            H2: "Heading 2",
            H3: "Heading 3",
            H4: "Heading 4",
            N: "Normal",
            PRE: "Code",
          },
          paragraphFormatSelection: true,
          toolbarButtons: {
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "clearFormatting",
              ],
            },
            moreParagraph: {
              buttons: [
                "|",
                "paragraphFormat",
                "align",
                "rightToLeft",
                "leftToRight",
                "outdent",
                "indent",
                "quote",
                "formatOL",
                "formatUL",
              ],
              buttonsVisible: 4,
            },
            moreRich: {
              buttons: [
                "|",
                "insertLink",
                "insertImage",
                "insertHR",
                "insertTable",
                "emoticons",
              ],
            },
            moreMisc: {
              buttons: ["undo", "redo", "clear", "selectAll"],
              align: "right",
              buttonsVisible: 3,
            },
          },
          spellcheck: false,
          saveInterval: 2000, // save the content every 2 seconds
          events: {
            "save.before": function (htmlContent: string) {
              methods.setValue("body", htmlContent);
              methods.trigger("body");
            },
          },
        }}
        model={model}
        onModelChange={(e: string) => setModel(e)}
      />
    </div>
  );
}

export { TextEditor };

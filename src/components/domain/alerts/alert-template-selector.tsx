export interface TemplateAlerteAffiche {
  cle: string;
  titre: string;
  message: string;
}

export interface AlertTemplateSelectorProps {
  templates: readonly TemplateAlerteAffiche[];
  onSelectTemplate: (cle: string) => void;
}

export function AlertTemplateSelector({ templates, onSelectTemplate }: AlertTemplateSelectorProps) {
  return (
    <div className="flex gap-2">
      {templates.map((template) => (
        <button
          key={template.cle}
          type="button"
          onClick={() => onSelectTemplate(template.cle)}
          className="rounded-full border border-marine-200 px-3 py-1.5 text-sm text-marine-700 transition-colors hover:border-lagoon-300 hover:bg-lagoon-50"
        >
          {template.titre}
        </button>
      ))}
    </div>
  );
}

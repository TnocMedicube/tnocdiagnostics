import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Beaker, Radio, AlertCircle } from 'lucide-react';
import { LabTest, ImagingService, TestCategoryType } from '../types';
import { useAdmin } from '../context/AdminContext';

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'test' | 'imaging';
  initialTest?: LabTest | null;
  initialImaging?: ImagingService | null;
}

const LAB_CATEGORIES: { id: TestCategoryType; name: string }[] = [
  { id: 'hematology', name: 'Hematology' },
  { id: 'chemistry', name: 'Clinical Chemistry & Organ Panels' },
  { id: 'microbiology', name: 'Microbiology & Cultures' },
  { id: 'parasitology', name: 'Parasitology & Stool/Blood' },
  { id: 'urinalysis', name: 'Urinalysis & Renal Screen' },
  { id: 'hormones', name: 'Endocrine & Hormones' },
  { id: 'fertility', name: 'Reproductive & Fertility' },
  { id: 'infectious', name: 'Infectious Disease & Serology' },
  { id: 'serology', name: 'Immunology & Serology' },
  { id: 'specialized', name: 'Specialized & Executive Health' },
];

const SAMPLE_TYPES: LabTest['sampleType'][] = [
  'Blood',
  'Urine',
  'Stool',
  'Swab',
  'Semen',
  'Sputum',
  'Fluid',
  'Non-invasive / Scan',
  'Other',
];

const AVAILABILITY_OPTIONS: LabTest['availability'][] = [
  'Available Daily',
  'Routine',
  'Available on Request',
  'Specialized Schedule',
];

const IMAGING_MODALITIES: ImagingService['modality'][] = [
  'Ultrasound',
  'ECG',
  'Digital X-Ray',
  'Other',
];

const IMAGING_STATUSES: ImagingService['status'][] = [
  'Available',
  'Available on Request',
  'Configurable / Inquiry',
];

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  type,
  initialTest,
  initialImaging,
}) => {
  const { addLabTest, updateLabTest, addImagingService, updateImagingService } = useAdmin();

  // Test form state
  const [testForm, setTestForm] = useState<Partial<LabTest>>({
    name: '',
    code: '',
    category: 'hematology',
    sampleType: 'Blood',
    description: '',
    evaluates: '',
    clinicalReasons: [],
    preparation: 'No special fasting required unless specified by doctor.',
    turnaroundTime: 'Same-day (1–3 hours)',
    availability: 'Available Daily',
    isCommon: false,
    notes: '',
  });

  const [clinicalReasonsInput, setClinicalReasonsInput] = useState('');

  // Imaging form state
  const [imagingForm, setImagingForm] = useState<Partial<ImagingService>>({
    name: '',
    modality: 'Ultrasound',
    description: '',
    commonIndications: [],
    patientPreparation: 'Comfortable clothing. Specific fasting/full bladder instructions provided prior to examination.',
    typicalDuration: '20–30 Minutes',
    status: 'Available',
  });

  const [indicationsInput, setIndicationsInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = type === 'test' ? Boolean(initialTest) : Boolean(initialImaging);

  useEffect(() => {
    if (type === 'test') {
      if (initialTest) {
        setTestForm(initialTest);
        setClinicalReasonsInput(initialTest.clinicalReasons?.join('\n') || '');
      } else {
        setTestForm({
          name: '',
          code: '',
          category: 'hematology',
          sampleType: 'Blood',
          description: '',
          evaluates: '',
          clinicalReasons: [],
          preparation: 'No special fasting required unless specified by clinician.',
          turnaroundTime: 'Same-day (1–3 hours)',
          availability: 'Available Daily',
          isCommon: false,
          notes: '',
        });
        setClinicalReasonsInput('');
      }
    } else {
      if (initialImaging) {
        setImagingForm(initialImaging);
        setIndicationsInput(initialImaging.commonIndications?.join('\n') || '');
      } else {
        setImagingForm({
          name: '',
          modality: 'Ultrasound',
          description: '',
          commonIndications: [],
          patientPreparation: 'Comfortable clothing. Specific fasting or full bladder instructions provided as indicated.',
          typicalDuration: '20–30 Minutes',
          status: 'Available',
        });
        setIndicationsInput('');
      }
    }
    setFormError(null);
  }, [type, initialTest, initialImaging, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (type === 'test') {
      if (!testForm.name?.trim()) {
        setFormError('Test name is required.');
        return;
      }
      if (!testForm.description?.trim()) {
        setFormError('Test clinical description is required.');
        return;
      }

      const reasons = clinicalReasonsInput
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean);

      const testPayload: Omit<LabTest, 'id'> = {
        name: testForm.name.trim(),
        code: testForm.code?.trim() || undefined,
        category: (testForm.category || 'hematology') as TestCategoryType,
        sampleType: (testForm.sampleType || 'Blood') as LabTest['sampleType'],
        description: testForm.description.trim(),
        evaluates: testForm.evaluates?.trim() || testForm.description.trim(),
        clinicalReasons: reasons.length > 0 ? reasons : ['General diagnostic assessment and health check'],
        preparation: testForm.preparation?.trim() || 'No special preparation required.',
        turnaroundTime: testForm.turnaroundTime?.trim() || 'Same-day',
        availability: (testForm.availability || 'Available Daily') as LabTest['availability'],
        isCommon: Boolean(testForm.isCommon),
        notes: testForm.notes?.trim() || undefined,
      };

      if (isEditing && initialTest) {
        updateLabTest(initialTest.id, testPayload);
      } else {
        addLabTest(testPayload);
      }
    } else {
      if (!imagingForm.name?.trim()) {
        setFormError('Imaging service name is required.');
        return;
      }
      if (!imagingForm.description?.trim()) {
        setFormError('Description of the imaging service is required.');
        return;
      }

      const indications = indicationsInput
        .split('\n')
        .map((i) => i.trim())
        .filter(Boolean);

      const imagingPayload: Omit<ImagingService, 'id'> = {
        name: imagingForm.name.trim(),
        modality: (imagingForm.modality || 'Ultrasound') as ImagingService['modality'],
        description: imagingForm.description.trim(),
        commonIndications: indications.length > 0 ? indications : ['Routine diagnostic imaging assessment'],
        patientPreparation: imagingForm.patientPreparation?.trim() || 'Wear comfortable clothing.',
        typicalDuration: imagingForm.typicalDuration?.trim() || '20–30 Minutes',
        status: (imagingForm.status || 'Available') as ImagingService['status'],
      };

      if (isEditing && initialImaging) {
        updateImagingService(initialImaging.id, imagingPayload);
      } else {
        addImagingService(imagingPayload);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center shadow-inner">
              {type === 'test' ? <Beaker className="w-5 h-5 text-red-400" /> : <Radio className="w-5 h-5 text-blue-400" />}
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {isEditing ? 'Edit Service' : 'Add New Service'}
              </h3>
              <p className="text-xs text-slate-300">
                {type === 'test' ? 'Laboratory Test Investigation' : 'Diagnostic Imaging Modality'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {formError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {type === 'test' ? (
            /* ========================================================================= */
            /* LAB TEST FIELDS                                                           */
            /* ========================================================================= */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Test Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={testForm.name || ''}
                    onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                    placeholder="e.g. Full Blood Picture (FBP / CBC)"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Code / Abbreviation
                  </label>
                  <input
                    type="text"
                    value={testForm.code || ''}
                    onChange={(e) => setTestForm({ ...testForm, code: e.target.value })}
                    placeholder="e.g. FBP, LFT, HbA1c, PSA"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Laboratory Category
                  </label>
                  <select
                    value={testForm.category || 'hematology'}
                    onChange={(e) => setTestForm({ ...testForm, category: e.target.value as TestCategoryType })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none bg-white"
                  >
                    {LAB_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Specimen / Sample Type
                  </label>
                  <select
                    value={testForm.sampleType || 'Blood'}
                    onChange={(e) => setTestForm({ ...testForm, sampleType: e.target.value as LabTest['sampleType'] })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none bg-white"
                  >
                    {SAMPLE_TYPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={testForm.description || ''}
                  onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                  placeholder="Comprehensive clinical explanation of what this test investigates and detects..."
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Evaluates / Key Parameters
                </label>
                <input
                  type="text"
                  value={testForm.evaluates || ''}
                  onChange={(e) => setTestForm({ ...testForm, evaluates: e.target.value })}
                  placeholder="e.g. Hemoglobin, White Blood Cells, Platelets, Indices"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Reasons & Indications (One per line)
                </label>
                <textarea
                  rows={3}
                  value={clinicalReasonsInput}
                  onChange={(e) => setClinicalReasonsInput(e.target.value)}
                  placeholder="Routine pre-operative health clearance&#10;Investigation of unexplained fatigue or infection&#10;Monitoring response to medical therapy"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={testForm.turnaroundTime || ''}
                    onChange={(e) => setTestForm({ ...testForm, turnaroundTime: e.target.value })}
                    placeholder="e.g. Same-day (1–2 hours), 24 hours"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Availability Status
                  </label>
                  <select
                    value={testForm.availability || 'Available Daily'}
                    onChange={(e) => setTestForm({ ...testForm, availability: e.target.value as LabTest['availability'] })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none bg-white"
                  >
                    {AVAILABILITY_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Patient Preparation Instructions
                </label>
                <input
                  type="text"
                  value={testForm.preparation || ''}
                  onChange={(e) => setTestForm({ ...testForm, preparation: e.target.value })}
                  placeholder="e.g. Fasting 8–12 hours required (water permitted)"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="is-common-checkbox"
                  type="checkbox"
                  checked={Boolean(testForm.isCommon)}
                  onChange={(e) => setTestForm({ ...testForm, isCommon: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-slate-300"
                />
                <label htmlFor="is-common-checkbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Feature this test prominently as a common / high-volume routine test
                </label>
              </div>
            </>
          ) : (
            /* ========================================================================= */
            /* IMAGING SERVICE FIELDS                                                    */
            /* ========================================================================= */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={imagingForm.name || ''}
                    onChange={(e) => setImagingForm({ ...imagingForm, name: e.target.value })}
                    placeholder="e.g. Obstetric & Pregnancy Ultrasound"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Diagnostic Modality
                  </label>
                  <select
                    value={imagingForm.modality || 'Ultrasound'}
                    onChange={(e) => setImagingForm({ ...imagingForm, modality: e.target.value as ImagingService['modality'] })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none bg-white"
                  >
                    {IMAGING_MODALITIES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={imagingForm.description || ''}
                  onChange={(e) => setImagingForm({ ...imagingForm, description: e.target.value })}
                  placeholder="Detailed clinical scope of the ultrasound or diagnostic investigation..."
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Common Clinical Indications (One per line)
                </label>
                <textarea
                  rows={3}
                  value={indicationsInput}
                  onChange={(e) => setIndicationsInput(e.target.value)}
                  placeholder="Fetal heartbeat and gestational age&#10;Placental positioning and amniotic fluid index&#10;Screening for congenital anatomical variations"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Typical Duration
                  </label>
                  <input
                    type="text"
                    value={imagingForm.typicalDuration || ''}
                    onChange={(e) => setImagingForm({ ...imagingForm, typicalDuration: e.target.value })}
                    placeholder="e.g. 20–30 Minutes"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Availability Status
                  </label>
                  <select
                    value={imagingForm.status || 'Available'}
                    onChange={(e) => setImagingForm({ ...imagingForm, status: e.target.value as ImagingService['status'] })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none bg-white"
                  >
                    {IMAGING_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Patient Preparation Guidelines
                </label>
                <input
                  type="text"
                  value={imagingForm.patientPreparation || ''}
                  onChange={(e) => setImagingForm({ ...imagingForm, patientPreparation: e.target.value })}
                  placeholder="e.g. Full bladder required (drink 3–4 glasses of water 1 hr prior)"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </>
          )}

          {/* Form Actions */}
          <div className="pt-5 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Create Service'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

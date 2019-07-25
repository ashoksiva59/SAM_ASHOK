export default function EquipmentStatus(context) {
   return { name: 'ObjectStatus_Nav/SystemStatus_Nav/StatusText', values: [{ReturnValue: 'Available', DisplayValue: context.localizeText('available')},{ReturnValue: 'Installed', DisplayValue: context.localizeText('installed')}]};
}

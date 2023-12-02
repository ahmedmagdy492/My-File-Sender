using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Helpers
{
    public static class ValidationHelper
    {
        public static List<string> GetValidationErrMsgs(ModelStateDictionary.ValueEnumerable values)
        {
            List<string> errors = new List<string>();
            foreach (var item in values)
            {
                if (item.Errors.Count > 0)
                    errors.Add(item.Errors[0].ErrorMessage);
            }

            return errors;
        }
    }
}
